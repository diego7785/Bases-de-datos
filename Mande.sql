DROP TABLE IF EXISTS Trabajador CASCADE;
DROP TABLE IF EXISTS Usuario CASCADE;
DROP TABLE IF EXISTS Labor CASCADE;
DROP TABLE IF EXISTS Cuenta_bancaria CASCADE;
DROP TABLE IF EXISTS Tarjeta_debito CASCADE;
DROP TABLE IF EXISTS Tarjeta_credito CASCADE;
DROP TABLE IF EXISTS Realiza CASCADE;
DROP TABLE IF EXISTS Direccion CASCADE;
DROP TABLE IF EXISTS Servicio CASCADE;
DROP TABLE IF EXISTS Paga CASCADE;
DROP TABLE IF EXISTS Servicio_pago CASCADE;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
DROP FUNCTION IF EXISTS add_geopint;
DROP FUNCTION IF EXISTS get_workers_results;
DROP FUNCTION IF EXISTS get_workers_results_advanced;
DROP FUNCTION IF EXISTS set_worker_busy;
DROP FUNCTION IF EXISTS set_time_date;
DROP FUNCTION IF EXISTS get_busy_information;
DROP FUNCTION IF EXISTS finalizar_labor;
DROP TRIGGER IF EXISTS trigger_add_geopint ON Direccion;
DROP TRIGGER IF EXISTS trigger_set_worker_busy ON Servicio;
DROP TRIGGER IF EXISTS trigger_set_time_date ON Servicio;
SET TIME ZONE -5;

CREATE TABLE Trabajador(
	cedula_trabajador VARCHAR(10) NOT NULL,
	celular_trabajador VARCHAR(10) NOT NULL,
	trabajador_email VARCHAR(50) NOT NULL,
	trabajador_nombre VARCHAR(70) NOT NULL,
	trabajador_apellido VARCHAR(70) NOT NULL,
	trabajador_contrasenia VARCHAR(255) NOT NULL,
	trabajador_calificacion INT NOT NULL,
	trabajador_foto_perfil VARCHAR(25),
	trabajador_foto_id_frente VARCHAR(25) NOT NULL,
	trabajador_foto_id_atras VARCHAR(25) NOT NULL,
	CONSTRAINT pk_trabajador PRIMARY KEY (cedula_trabajador)
 );

 CREATE TABLE Usuario(
	 cedula_usuario VARCHAR(10) NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 usuario_email VARCHAR(50) NOT NULL,
	 usuario_nombre VARCHAR(70) NOT NULL,
	 usuario_apellido VARCHAR(70) NOT NULL,
	 usuario_contrasenia VARCHAR(255) NOT NULL,
	 usuario_foto_perfil VARCHAR(25),
	 usuario_foto_id_frente VARCHAR(25) NOT NULL,
	 usuario_foto_id_atras VARCHAR(25) NOT NULL,
	 usuario_foto_recibo VARCHAR(25) NOT NULL,
	 CONSTRAINT pk_usuario PRIMARY KEY (celular_usuario)
 );

 CREATE TABLE Cuenta_bancaria(
 	 numero_cuenta_bancaria VARCHAR(255) NOT NULL,
	 cuenta_bancaria_banco VARCHAR(50) NOT NULL,
	 cuenta_bancaria_tipo VARCHAR(30) NOT NULL,
	 cedula_trabajador VARCHAR(10) NOT NULL,
	 CONSTRAINT pk_cuenta_bancaria PRIMARY KEY (numero_cuenta_bancaria),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador) REFERENCES Trabajador(cedula_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT
 );

  CREATE TABLE Labor(
	 id_labor SERIAL NOT NULL,
	 labor_nombre VARCHAR(50) NOT NULL,
	 CONSTRAINT pk_labor PRIMARY KEY (id_labor)
 );

 CREATE TABLE Realiza(
	 id_labor INT NOT NULL,
	 cedula_trabajador VARCHAR(10) NOT NULL,
	 realiza_precio INT NOT NULL,
	 realiza_tipo VARCHAR(10) NOT NULL,
	 labor_descripcion VARCHAR(200) NOT NULL,
	 trabajador_estado BIT NOT NULL,
	 CONSTRAINT pk_realiza PRIMARY KEY (cedula_trabajador,id_labor),
	 CONSTRAINT fk_labor FOREIGN KEY (id_labor) REFERENCES Labor(id_labor) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador) REFERENCES Trabajador(cedula_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Direccion(
	 id_direccion SERIAL NOT NULL,
	 celular_usuario VARCHAR(10),
	 cedula_trabajador VARCHAR(10),
	 direccion_latitud DECIMAL(7,5) NOT NULL,
 	 direccion_longitud DECIMAL(7,5) NOT NULL,
	 direccion_domicilio VARCHAR(200) NOT NULL,
	 direccion_complemento VARCHAR(100),
	 direccion_ubicacion GEOGRAPHY(POINT,4686),
	 CONSTRAINT pk_direccion PRIMARY KEY (id_direccion),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador) REFERENCES Trabajador(cedula_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
 );

CREATE TABLE Tarjeta_debito(
	 numero_tarjeta_debito VARCHAR(255) NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 tarjeta_debito_banco VARCHAR(50) NOT NULL,
	 tarjeta_debito_numero_cuenta VARCHAR(255) NOT NULL,
	 CONSTRAINT pk_tarjeta_debito PRIMARY KEY (numero_tarjeta_debito),
	 CONSTRAINT fK_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Tarjeta_credito(
	 numero_tarjeta_credito VARCHAR(255) NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 tarjeta_credito_banco VARCHAR(50) NOT NULL,
	 tarjeta_credito_fecha_vencimiento VARCHAR(5) NOT NULL,
	 tarjeta_credito_cvc VARCHAR(255) NOT NULL,
	 CONSTRAINT pk_tarjeta_credito PRIMARY KEY (numero_tarjeta_credito),
	 CONSTRAINT fK_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Servicio(
	 id_servicio SERIAL NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 cedula_trabajador VARCHAR(10) NOT NULL,
	 labor_id INT NOT NULL,
	 servicio_descripcion VARCHAR(200) NOT NULL,
	 servicio_fecha DATE NOT NULL,
	 servicio_hora_inicio TIME NOT NULL,
	 servicio_hora_fin TIME,
	 servicio_calificacion INT DEFAULT 0,
	 paga_fecha_pago DATE,
	 paga_valor_pago INT,
	 numero_tarjeta_debito VARCHAR(255),
	 numero_tarjeta_credito VARCHAR(255),
	 CONSTRAINT pk_servicio PRIMARY KEY (id_servicio),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador) REFERENCES Trabajador(cedula_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_labor FOREIGN KEY (labor_id) REFERENCES Labor(id_labor) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_tarjeta_debito FOREIGN KEY (numero_tarjeta_debito) REFERENCES Tarjeta_debito(numero_tarjeta_debito) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_tarjeta_credito FOREIGN KEY (numero_tarjeta_credito) REFERENCES Tarjeta_credito(numero_tarjeta_credito) ON UPDATE CASCADE ON DELETE RESTRICT
 );




-- FUNCTIONS
-- Funcion para convertir las coordenadas en puntos para usar con postgis
CREATE OR REPLACE FUNCTION add_geopint() RETURNS TRIGGER AS $$
DECLARE
BEGIN
    NEW.direccion_ubicacion := ST_SetSRID(ST_MakePoint(NEW.direccion_longitud,NEW.direccion_latitud),4686);
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Funcion para obtener los datos del trabajador que se busca y calcular la distancia
-- Parametros: Labor a buscar, Celular usuario
CREATE OR REPLACE FUNCTION get_workers_results (VARCHAR(50), VARCHAR(10)) RETURNS TABLE(cedula_trabajador VARCHAR(10), id_labor INT, realiza_precio INT, realiza_tipo VARCHAR(10), labor_descripcion VARCHAR(200),
																						trabajador_estado BIT, trabajador_nombre VARCHAR(70), trabajador_apellido VARCHAR(70), trabajador_calificacion INT,
																						trabajador_foto_perfil VARCHAR(25), direccion_domicilio VARCHAR(70), distancia DOUBLE PRECISION) AS $$
DECLARE
	nombre_labor ALIAS FOR $1;
	celularU ALIAS FOR $2;
	idlabor INTEGER := (SELECT Labor.id_labor FROM Labor WHERE labor_nombre = nombre_labor);
	ubicacionU GEOGRAPHY := (SELECT direccion_ubicacion FROM Direccion WHERE celular_usuario=celularU);
BEGIN
	RETURN QUERY WITH Trabajador_realiza AS (SELECT Trabajador.cedula_trabajador, Realiza.id_labor, Realiza.realiza_precio, Realiza.realiza_tipo, Realiza.labor_descripcion, Realiza.trabajador_estado, Trabajador.trabajador_nombre, Trabajador.trabajador_apellido, Trabajador.trabajador_calificacion, Trabajador.trabajador_foto_perfil
							FROM Trabajador NATURAL JOIN Realiza WHERE Realiza.id_labor=idlabor), TR_Direccion AS (SELECT Trabajador_realiza.cedula_trabajador, Trabajador_realiza.id_labor, Trabajador_realiza.realiza_precio, Trabajador_realiza.realiza_tipo, Trabajador_realiza.labor_descripcion, Trabajador_realiza.trabajador_estado,
								Trabajador_realiza.trabajador_nombre, Trabajador_realiza.trabajador_apellido, Trabajador_realiza.trabajador_calificacion, Trabajador_realiza.trabajador_foto_perfil, Direccion.direccion_latitud, Direccion.direccion_longitud, Direccion.direccion_domicilio, Direccion.direccion_ubicacion FROM Trabajador_realiza NATURAL JOIN Direccion),
							Distancia AS (SELECT TR_Direccion.cedula_trabajador, ST_Distance(TR_Direccion.direccion_ubicacion, ubicacionU) AS DistanciaUT FROM TR_Direccion)
							SELECT DISTINCT Distancia.cedula_trabajador, TR_Direccion.id_labor, TR_Direccion.realiza_precio, TR_Direccion.realiza_tipo, TR_Direccion.labor_descripcion, TR_Direccion.trabajador_estado, TR_Direccion.trabajador_nombre, TR_Direccion.trabajador_apellido, TR_Direccion.trabajador_calificacion, TR_Direccion.trabajador_foto_perfil,
							TR_Direccion.direccion_domicilio, DistanciaUT FROM TR_Direccion NATURAL JOIN Distancia ORDER BY TR_Direccion.trabajador_calificacion, DistanciaUT, TR_Direccion.realiza_precio;
END;
$$
LANGUAGE plpgsql;
select * from get_workers_results('Profesor de matemáticas', '1987654321');

-- Funcion para obtener los datos del trabajador que se busca avanzadamente y calcular la distancia
-- Parametros: Labor a buscar, celular usuario, tipo de cobro, cantidad de estrellas, precio minimo, precio maximo
CREATE OR REPLACE FUNCTION get_workers_results_advanced (VARCHAR(50), VARCHAR(10), VARCHAR(10), INTEGER, INTEGER, INTEGER) RETURNS TABLE(cedula_trabajador VARCHAR(10), id_labor INT, realiza_precio INT, realiza_tipo VARCHAR(10), labor_descripcion VARCHAR(200),
																						trabajador_estado BIT, trabajador_nombre VARCHAR(70), trabajador_apellido VARCHAR(70), trabajador_calificacion INT,
																						trabajador_foto_perfil VARCHAR(25), direccion_domicilio VARCHAR(70), distancia DOUBLE PRECISION) AS $$
DECLARE
	nombre_labor ALIAS FOR $1;
	celularU ALIAS FOR $2;
	tipoC ALIAS FOR $3;
	cEstrellas ALIAS FOR $4;
	pMin ALIAS FOR $5;
	pMax ALIAS FOR $6;
	idlabor INTEGER := (SELECT Labor.id_labor FROM Labor WHERE labor_nombre = nombre_labor);
	ubicacionU GEOGRAPHY := (SELECT direccion_ubicacion FROM Direccion WHERE celular_usuario=celularU);
BEGIN
	RETURN QUERY WITH Trabajador_realiza AS (SELECT Trabajador.cedula_trabajador, Realiza.id_labor, Realiza.realiza_precio, Realiza.realiza_tipo, Realiza.labor_descripcion, Realiza.trabajador_estado, Trabajador.trabajador_nombre, Trabajador.trabajador_apellido, Trabajador.trabajador_calificacion,
							Trabajador.trabajador_foto_perfil FROM Trabajador NATURAL JOIN Realiza WHERE Realiza.id_labor=idlabor AND Realiza.realiza_tipo=tipoC AND Trabajador.trabajador_calificacion=cEstrellas AND Realiza.realiza_precio BETWEEN pMin AND pMax), TR_Direccion AS (SELECT Trabajador_realiza.cedula_trabajador, Trabajador_realiza.id_labor, Trabajador_realiza.realiza_precio, Trabajador_realiza.realiza_tipo, Trabajador_realiza.labor_descripcion, Trabajador_realiza.trabajador_estado,
								Trabajador_realiza.trabajador_nombre, Trabajador_realiza.trabajador_apellido, Trabajador_realiza.trabajador_calificacion, Trabajador_realiza.trabajador_foto_perfil, Direccion.direccion_latitud, Direccion.direccion_longitud, Direccion.direccion_domicilio, Direccion.direccion_ubicacion FROM Trabajador_realiza NATURAL JOIN Direccion),
							Distancia AS (SELECT TR_Direccion.cedula_trabajador, ST_Distance(TR_Direccion.direccion_ubicacion, ubicacionU) AS DistanciaUT FROM TR_Direccion)
							SELECT DISTINCT Distancia.cedula_trabajador, TR_Direccion.id_labor, TR_Direccion.realiza_precio, TR_Direccion.realiza_tipo, TR_Direccion.labor_descripcion, TR_Direccion.trabajador_estado, TR_Direccion.trabajador_nombre, TR_Direccion.trabajador_apellido, TR_Direccion.trabajador_calificacion, TR_Direccion.trabajador_foto_perfil, TR_Direccion.direccion_domicilio,
							DistanciaUT FROM TR_Direccion NATURAL JOIN Distancia ORDER BY TR_Direccion.trabajador_calificacion, DistanciaUT, TR_Direccion.realiza_precio;
END;
$$
LANGUAGE plpgsql;

-- Funcion para setear trabajador ocupado
CREATE OR REPLACE FUNCTION set_worker_busy() RETURNS TRIGGER AS $$
DECLARE
	idCard VARCHAR(10) := NEW.cedula_trabajador;
BEGIN
	UPDATE Realiza SET trabajador_estado = B'0' WHERE cedula_trabajador = idCard;
	RETURN NEW;
END
$$
LANGUAGE 	plpgsql;


-- Funcion para Insertar fecha, hora y setear la calificacion inicial en servicio
CREATE OR REPLACE FUNCTION set_time_date() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	SET TIME ZONE -5;
	NEW.servicio_fecha := (SELECT current_date);
	NEW.servicio_hora_inicio := (SELECT current_time);
	NEW.servicio_calificacion := 0;
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Funcion para notificar que ha sido seleccionado para una labor
-- Parametros: Cedula del trabajador  (Si no esta ocupado retorna la tabla vacia)
CREATE OR REPLACE FUNCTION get_busy_information(VARCHAR(10)) RETURNS TABLE(idservicio INTEGER, celularU VARCHAR(10), laborid INTEGER, serviciodescripcion VARCHAR(200),
																			serviciofecha DATE, serviciohorainicio TIME, labornombre VARCHAR(70), distancia DOUBLE PRECISION, domicilio VARCHAR(70)) AS $$
DECLARE
	idCard ALIAS FOR $1;
	status INTEGER := CAST((SELECT trabajador_estado FROM Realiza WHERE cedula_trabajador = idCard ORDER BY id_labor LIMIT 1) AS INTEGER);
	ubiT GEOGRAPHY = (SELECT direccion_ubicacion FROM Direccion WHERE cedula_trabajador = idCard);
BEGIN
	IF(status = 0)
	THEN
		RETURN QUERY WITH info_servicio AS (SELECT id_servicio, celular_usuario, labor_id, servicio_descripcion, servicio_fecha, servicio_hora_inicio
							FROM Servicio WHERE servicio_hora_fin IS NULL AND cedula_trabajador = idCard),
							servicio_labor AS (SELECT id_servicio, celular_usuario, labor_id, servicio_descripcion, servicio_fecha, servicio_hora_inicio,
							labor_nombre FROM info_servicio INNER JOIN Labor ON labor_id = id_labor),
							servicio_direccion AS (SELECT id_servicio, servicio_labor.celular_usuario, labor_id, servicio_descripcion, servicio_fecha, servicio_hora_inicio,
							labor_nombre, direccion_ubicacion, direccion_domicilio FROM Direccion INNER JOIN servicio_labor ON Direccion.celular_usuario = servicio_labor.celular_usuario),
							distance AS (SELECT celular_usuario, ST_Distance(direccion_ubicacion, ubiT) AS dist FROM servicio_direccion)
							SELECT id_servicio, servicio_direccion.celular_usuario, labor_id, servicio_descripcion, servicio_fecha, servicio_hora_inicio,
							labor_nombre, dist, direccion_domicilio FROM servicio_direccion NATURAL JOIN distance;
	END IF;
END
$$ LANGUAGE plpgsql;

-- Funcion para determinar que tipo de pago usa el usuario
-- Parametros; idServicio
CREATE OR REPLACE FUNCTION get_type_pay(INTEGER) RETURNS TEXT AS $$
DECLARE
	idServicio ALIAS FOR $1;
	celularU VARCHAR(10) := (SELECT celular_usuario FROM Servicio WHERE id_servicio = idServicio);
BEGIN
	IF NOT EXISTS (SELECT numero_tarjeta_credito FROM Tarjeta_credito WHERE celular_usuario = celularU)
	THEN
		RETURN 'Debito';
	ELSE
		RETURN 'Credito';
	END IF;
END;
$$
LANGUAGE plpgsql;

-- Funcion para finalizar la labor
-- Parametros: id del servicio, tipo de tarjeta
CREATE OR REPLACE FUNCTION finalizar_labor(INTEGER, VARCHAR(7)) RETURNS TEXT AS $$
DECLARE
	idServicio ALIAS FOR $1;
	tipoPago ALIAS FOR $2;
	cedulaT VARCHAR(10) := (SELECT cedula_trabajador FROM Servicio WHERE id_servicio = idServicio);
	celularU VARCHAR(10) := (SELECT celular_usuario FROM Servicio WHERE id_servicio = idServicio);
	idLabor INTEGER := (SELECT labor_id FROM Servicio WHERE id_servicio = idServicio);
	tipoCobro VARCHAR(10) := (SELECT realiza_tipo FROM realiza WHERE cedula_trabajador=cedulaT AND id_labor=idLabor);
	precio INTEGER := (SELECT realiza_precio FROM realiza WHERE cedula_trabajador=cedulaT AND id_labor=idLabor);
BEGIN
	SET TIME ZONE -5;
	IF(tipoCobro = 'Por hora')
	THEN
		DECLARE
			diaInicio DOUBLE PRECISION := (SELECT EXTRACT(DAY FROM servicio_fecha ) FROM Servicio WHERE id_servicio = idServicio);
			diaFinal DOUBLE PRECISION := EXTRACT(DAY FROM (SELECT current_date));
			inicio DOUBLE PRECISION := (SELECT EXTRACT(HOUR FROM servicio_hora_inicio ) FROM Servicio WHERE id_servicio = idServicio);
			final DOUBLE PRECISION := EXTRACT(HOUR FROM (SELECT current_time));
			lapsoH INTEGER := CAST(final - inicio AS INTEGER);
			lapsoD INTEGER := CAST(diaFinal - diaInicio AS INTEGER);
		BEGIN
			IF(lapsoD = 0)
			THEN
				IF(lapsoH = 0)
				THEN
					IF (tipoPago = 'Credito')
					THEN
						DECLARE
							t_credit VARCHAR(255) := (SELECT numero_tarjeta_credito FROM Tarjeta_credito WHERE celular_usuario = celularU);
						BEGIN
							UPDATE Servicio SET numero_tarjeta_credito = t_credit,
												servicio_hora_fin = (SELECT current_time),
												paga_fecha_pago = (SELECT current_date),
												paga_valor_pago = precio WHERE id_servicio = idServicio;
						END;
					ELSE
						DECLARE
							t_debit VARCHAR(255) := (SELECT numero_tarjeta_debito FROM Tarjeta_debito WHERE celular_usuario = celularU);
						BEGIN
							UPDATE Servicio SET numero_tarjeta_debito = t_debit,
												servicio_hora_fin = (SELECT current_time),
												paga_fecha_pago = (SELECT current_date),
												paga_valor_pago = precio WHERE id_servicio = idServicio;
						END;
					END IF;
				ELSE
					DECLARE
						pago INTEGER := lapsoH * precio;
					BEGIN
						IF (tipoPago = 'Credito')
						THEN
							DECLARE
								t_credit VARCHAR(255) := (SELECT numero_tarjeta_credito FROM Tarjeta_credito WHERE celular_usuario = celularU);
							BEGIN
								UPDATE Servicio SET numero_tarjeta_credito = t_credit,
													servicio_hora_fin = (SELECT current_time),
													paga_fecha_pago = (SELECT current_date),
													paga_valor_pago = pago WHERE id_servicio = idServicio;
							END;
						ELSE
							DECLARE
								t_debit VARCHAR(255) := (SELECT numero_tarjeta_debito FROM Tarjeta_debito WHERE celular_usuario = celularU);
							BEGIN
								UPDATE Servicio SET numero_tarjeta_debito = t_debit,
													servicio_hora_fin = (SELECT current_time),
													paga_fecha_pago = (SELECT current_date),
													paga_valor_pago = pago WHERE id_servicio = idServicio;
							END;
						END IF;
					END;
				END IF;
			ELSE
				IF(lapsoH = 0)
				THEN
					IF (tipoPago = 'Credito')
					THEN
						DECLARE
							precioD INTEGER := 24 * precio;
							t_credit VARCHAR(255) := (SELECT numero_tarjeta_credito FROM Tarjeta_credito WHERE celular_usuario = celularU);
						BEGIN
							UPDATE Servicio SET numero_tarjeta_credito = t_credit,
												servicio_hora_fin = (SELECT current_time),
												paga_fecha_pago = (SELECT current_date),
												paga_valor_pago = precioD WHERE id_servicio = idServicio;
						END;
					ELSE
						DECLARE
							precioD INTEGER := 24 * precio;
							t_debit VARCHAR(255) := (SELECT numero_tarjeta_debito FROM Tarjeta_debito WHERE celular_usuario = celularU);
						BEGIN
							UPDATE Servicio SET numero_tarjeta_debito = t_debit,
												servicio_hora_fin = (SELECT current_time),
												paga_fecha_pago = (SELECT current_date),
												paga_valor_pago = precioD WHERE id_servicio = idServicio;
						END;
					END IF;
				ELSE
					DECLARE
						pago INTEGER := 24 * lapsoD * precio + lapsoH * precio;
					BEGIN
						IF (tipoPago = 'Credito')
						THEN
							DECLARE
								t_credit VARCHAR(255) := (SELECT numero_tarjeta_credito FROM Tarjeta_credito WHERE celular_usuario = celularU);
							BEGIN
								UPDATE Servicio SET numero_tarjeta_credito = t_credit,
													servicio_hora_fin = (SELECT current_time),
													paga_fecha_pago = (SELECT current_date),
													paga_valor_pago = pago WHERE id_servicio = idServicio;
							END;
						ELSE
							DECLARE
								t_debit VARCHAR(255) := (SELECT numero_tarjeta_debito FROM Tarjeta_debito WHERE celular_usuario = celularU);
							BEGIN
								UPDATE Servicio SET numero_tarjeta_debito = t_debit,
													servicio_hora_fin = (SELECT current_time),
													paga_fecha_pago = (SELECT current_date),
													paga_valor_pago = pago WHERE id_servicio = idServicio;
							END;
						END IF;
					END;
				END IF;
			END IF;
		END;
	ELSE
		IF (tipoPago = 'Credito')
		THEN
			DECLARE
				t_credit VARCHAR(255) := (SELECT numero_tarjeta_credito FROM Tarjeta_credito WHERE celular_usuario = celularU);
			BEGIN
				UPDATE Servicio SET numero_tarjeta_credito = t_credit,
									servicio_hora_fin = (SELECT current_time),
									paga_fecha_pago = (SELECT current_date),
									paga_valor_pago = precio WHERE id_servicio = idServicio;
			END;
		ELSE
			DECLARE
				t_debit VARCHAR(255) := (SELECT numero_tarjeta_debito FROM Tarjeta_debito WHERE celular_usuario = celularU);
			BEGIN
				UPDATE Servicio SET numero_tarjeta_debito = t_debit,
									servicio_hora_fin = (SELECT current_time),
									paga_fecha_pago = (SELECT current_date),
									paga_valor_pago = precio WHERE id_servicio = idServicio;
			END;
		END IF;
	END IF;

	UPDATE Realiza SET trabajador_estado = B'1' WHERE cedula_trabajador = cedulaT;
	RETURN 'OK';
END
$$ LANGUAGE plpgsql;

-- Funcion para avisar al usuario las labores que tiene sin calificar y notificar el cobro
-- Parametros: Celular usuario
CREATE OR REPLACE FUNCTION labores_sin_calificar(VARCHAR(10)) RETURNS TABLE(idServicio INTEGER, cedulaT VARCHAR(10), idLabor INTEGER, hora TIME, fecha DATE, valor INTEGER, nombreLabor VARCHAR(50), trabajadorNombre VARCHAR(70), trabajadorApellido VARCHAR(70))
AS $$
DECLARE
	celularU ALIAS FOR $1;
BEGIN
	RETURN QUERY WITH servicio_info AS(SELECT id_servicio, cedula_trabajador, labor_id, servicio_hora_fin, paga_fecha_pago, paga_valor_pago
		FROM servicio WHERE celular_usuario = celularU AND servicio_calificacion = 0
			ORDER BY paga_fecha_pago, servicio_hora_fin LIMIT 1),
	servicio_labor AS (SELECT id_servicio, cedula_trabajador, labor_id, servicio_hora_fin, paga_fecha_pago, paga_valor_pago, labor_nombre
		FROM servicio_info, Labor WHERE labor_id = id_labor), servicio_trabajador AS (SELECT id_servicio, servicio_labor.cedula_trabajador, labor_id,
																					  servicio_hora_fin, paga_fecha_pago, paga_valor_pago, labor_nombre, trabajador_nombre, trabajador_apellido
		FROM servicio_labor, Trabajador WHERE servicio_labor.cedula_trabajador = Trabajador.cedula_trabajador) SELECT * FROM servicio_trabajador;

END;
$$
LANGUAGE plpgsql;

--Funcion para calificar el usuario
-- Parametros: id del servicio, calificacion
CREATE OR REPLACE FUNCTION calificar_labor(INTEGER, INTEGER) RETURNS TEXT AS $$
DECLARE
	idServicio ALIAS FOR $1;
	calificacion ALIAS FOR $2;
	cedulaT VARCHAR(10) := (SELECT cedula_trabajador FROM Servicio WHERE id_servicio = idServicio);
BEGIN
	UPDATE Servicio SET servicio_calificacion = calificacion WHERE id_servicio = idServicio;
	DECLARE
		califOld INTEGER := (SELECT trabajador_calificacion FROM Trabajador WHERE cedula_trabajador = cedulaT);
		califNew INTEGER := (califOld + calificacion)/2;
	BEGIN
		IF(califOld = 0)
		THEN
			UPDATE Trabajador SET trabajador_calificacion = calificacion WHERE cedula_trabajador = cedulaT;
		ELSE
			UPDATE Trabajador SET trabajador_calificacion = califNew WHERE cedula_trabajador = cedulaT;
		END IF;
	END;
RETURN 'OK';
END;
$$
LANGUAGE plpgsql;

--validaciones worker
CREATE OR REPLACE FUNCTION validateIdWorker(VARCHAR(10)) RETURNS boolean AS $$
DECLARE
IdCard ALIAS FOR $1;
BEGIN
IF NOT EXISTS (SELECT cedula_trabajador FROM trabajador WHERE cedula_trabajador = IdCard)
THEN RETURN FALSE;
END IF;
RETURN TRUE;
END $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION validateEmailWorker(VARCHAR(50)) RETURNS boolean AS $$
DECLARE
email ALIAS FOR $1;
BEGIN
IF NOT EXISTS (SELECT trabajador_email FROM trabajador WHERE trabajador_email = email)
THEN RETURN FALSE;
END IF;
RETURN TRUE;
END $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION validateAccountWorker(VARCHAR(255)) RETURNS boolean AS $$
DECLARE
account ALIAS FOR $1;
BEGIN
IF NOT EXISTS (SELECT numero_cuenta_bancaria FROM cuenta_bancaria WHERE PGP_SYM_DECRYPT(numero_cuenta_bancaria::bytea, 'AES_KEY') = account)
THEN RETURN FALSE;
END IF;
RETURN TRUE;
END $$ LANGUAGE PLPGSQL;

--usuario validaciones
CREATE OR REPLACE FUNCTION validateIdUser(VARCHAR(10)) RETURNS boolean AS $$
DECLARE
IdCard ALIAS FOR $1;
BEGIN
IF NOT EXISTS (SELECT cedula_usuario FROM usuario WHERE cedula_usuario = IdCard)
THEN RETURN FALSE;
END IF;
RETURN TRUE;
END $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION validateEmailUser(VARCHAR(50)) RETURNS boolean AS $$
DECLARE
email ALIAS FOR $1;
BEGIN
IF NOT EXISTS (SELECT usuario_email FROM usuario WHERE usuario_email = email)
THEN RETURN FALSE;
END IF;
RETURN TRUE;
END $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION validatePhoneUser(VARCHAR(10)) RETURNS boolean AS $$
DECLARE
phone ALIAS FOR $1;
BEGIN
IF NOT EXISTS (SELECT celular_usuario FROM usuario WHERE celular_usuario = phone)
THEN RETURN FALSE;
END IF;
RETURN TRUE;
END $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION validateCreditCardUser(VARCHAR(255)) RETURNS boolean AS $$
DECLARE
cardNumber ALIAS FOR $1;
BEGIN
IF NOT EXISTS (SELECT numero_tarjeta_credito FROM tarjeta_credito WHERE PGP_SYM_DECRYPT(numero_tarjeta_credito::bytea, 'AES_KEY') = cardNumber)
THEN RETURN FALSE;
END IF;
RETURN TRUE;
END $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION validateDebitCardUser(VARCHAR(255)) RETURNS boolean AS $$
DECLARE
cardNumber ALIAS FOR $1;
BEGIN
IF NOT EXISTS (SELECT numero_tarjeta_debito FROM tarjeta_debito WHERE PGP_SYM_DECRYPT(numero_tarjeta_debito::bytea, 'AES_KEY') = cardNumber)
THEN RETURN FALSE;
END IF;
RETURN TRUE;
END $$ LANGUAGE PLPGSQL;


 --TRIGGERS
 -- Trigger para convertir las coordenadas en puntos para usar con postgis
CREATE TRIGGER trigger_add_geopint BEFORE INSERT ON Direccion
FOR EACH ROW
EXECUTE PROCEDURE add_geopint();

-- trigger para setear el estado del usuario
CREATE TRIGGER trigger_set_worker_busy BEFORE INSERT ON Servicio
FOR EACH ROW
EXECUTE PROCEDURE set_worker_busy();

CREATE TRIGGER trigger_set_time_date BEFORE INSERT ON Servicio
FOR EACH ROW
EXECUTE PROCEDURE set_time_date();


INSERT INTO Labor(labor_nombre) VALUES('Profesor Ingles'),
																			('Paseador de perros'),
																			('Profesor de matemáticas'),
																			('Plomero'),
																			('Electricista');

INSERT INTO Usuario VALUES('1234567890', '1987654321', 'admin@admin.com', 'Admin', 'Mande', PGP_SYM_ENCRYPT('mande123', 'AES_KEY'), 'profilepic-1234567890', 'front-1234567890', 'back-1234567890', 'recibo-1234567890');

INSERT INTO Direccion(celular_usuario, direccion_latitud, direccion_longitud, direccion_domicilio) VALUES('1987654321', 3.376804, -76.530432, 'Calle 2c No 92 - 133, Cali, Valle del Cauca, Colombia');

INSERT INTO Tarjeta_debito VALUES (PGP_SYM_ENCRYPT('1234567890', 'AES_KEY'), '1987654321', 'Bancolombia', PGP_SYM_ENCRYPT('1234567890', 'AES_KEY'));

INSERT INTO Trabajador VALUES('1234567890', '1987654321', 'admin@admin.com', 'Admin', 'Mande', PGP_SYM_ENCRYPT('mande123', 'AES_KEY'), 0, 'profilepic-1234567890', 'front-1234567890', 'back-11234567890');

INSERT INTO Cuenta_bancaria VALUES(PGP_SYM_ENCRYPT('1234567890', 'AES_KEY'), 'Bancolombia', 'Cuenta de ahorros', '1234567890');

INSERT INTO Realiza VALUES(3, '1234567890', 23000, 'Por hora', 'Quiero ensenar mates', B'1');

INSERT INTO Direccion(cedula_trabajador, direccion_latitud, direccion_longitud, direccion_domicilio) VALUES('1234567890', 3.546146, -76.290326, 'Cra 25 # 54 - 56, Palmira, Valle del Cauca, Colombia');

INSERT INTO Trabajador VALUES('2234567890', '2987654321', 'admi2n@admin2.com', 'Admin2', 'Mande', PGP_SYM_ENCRYPT('mande123', 'AES_KEY'), 0, 'profilepic-2234567890', 'front-2234567890', 'back-21234567890');

INSERT INTO Cuenta_bancaria VALUES(PGP_SYM_ENCRYPT('2234567890', 'AES_KEY'), 'Bancolombia', 'Cuenta de ahorros', '2234567890');

INSERT INTO Realiza VALUES(3, '2234567890', 25000, 'Por hora', 'Quiero ensenar mates++', B'1');

INSERT INTO Direccion(cedula_trabajador, direccion_latitud, direccion_longitud, direccion_domicilio) VALUES('2234567890', 3.376045, -76.550033, 'Calle 2c # 92 - 133, Cali, Valle del Cauca, Colombia');

-- select COUNT(*), labor_id, labor_nombre from servicio INNER JOIN labor ON labor_id = id_labor where  cedula_trabajador='1234567890' GROUP BY labor_id, labor_nombre;
