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
DROP TRIGGER IF EXISTS trigger_add_geopint ON Direccion;

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
	 direccion_domicilio VARCHAR(70) NOT NULL,
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
	 servicio_calificacion INT,
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
CREATE FUNCTION add_geopint() RETURNS TRIGGER AS $$
DECLARE
BEGIN
    NEW.direccion_ubicacion := ST_SetSRID(ST_MakePoint(NEW.direccion_longitud,NEW.direccion_latitud),4686);
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Funcion para obtener los datos del trabajador que se busca y calcular la distancia
-- Parametros: Labor a buscar, Celular usuario
CREATE OR REPLACE FUNCTION get_workers_results (VARCHAR(50), VARCHAR(10)) RETURNS TABLE(cedula_trabajador VARCHAR(10), realiza_precio INT, realiza_tipo VARCHAR(10), labor_descripcion VARCHAR(200),
																						trabajador_estado BIT, trabajador_nombre VARCHAR(70), trabajador_apellido VARCHAR(70), trabajador_calificacion INT,
																						trabajador_foto_perfil VARCHAR(25), direccion_domicilio VARCHAR(70), distancia DOUBLE PRECISION) AS $$
DECLARE
	nombre_labor ALIAS FOR $1;
	celularU ALIAS FOR $2;
	idlabor INTEGER := (SELECT id_labor FROM Labor WHERE labor_nombre = nombre_labor);
	ubicacionU GEOGRAPHY := (SELECT direccion_ubicacion FROM Direccion WHERE celular_usuario=celularU);
BEGIN
	RETURN QUERY WITH Trabajador_realiza AS (SELECT Trabajador.cedula_trabajador, Realiza.realiza_precio, Realiza.realiza_tipo, Realiza.labor_descripcion, Realiza.trabajador_estado, Trabajador.trabajador_nombre, Trabajador.trabajador_apellido, Trabajador.trabajador_calificacion, Trabajador.trabajador_foto_perfil
							FROM Trabajador NATURAL JOIN Realiza WHERE id_labor=idlabor), TR_Direccion AS (SELECT Trabajador_realiza.cedula_trabajador, Trabajador_realiza.realiza_precio, Trabajador_realiza.realiza_tipo, Trabajador_realiza.labor_descripcion, Trabajador_realiza.trabajador_estado,
								Trabajador_realiza.trabajador_nombre, Trabajador_realiza.trabajador_apellido, Trabajador_realiza.trabajador_calificacion, Trabajador_realiza.trabajador_foto_perfil, Direccion.direccion_latitud, Direccion.direccion_longitud, Direccion.direccion_domicilio, Direccion.direccion_ubicacion FROM Trabajador_realiza NATURAL JOIN Direccion),
							Distancia AS (SELECT TR_Direccion.cedula_trabajador, ST_Distance(TR_Direccion.direccion_ubicacion, ubicacionU) AS DistanciaUT FROM TR_Direccion)
							SELECT DISTINCT Distancia.cedula_trabajador, TR_Direccion.realiza_precio, TR_Direccion.realiza_tipo, TR_Direccion.labor_descripcion, TR_Direccion.trabajador_estado, TR_Direccion.trabajador_nombre, TR_Direccion.trabajador_apellido, TR_Direccion.trabajador_calificacion, TR_Direccion.trabajador_foto_perfil,
							TR_Direccion.direccion_domicilio, DistanciaUT FROM TR_Direccion NATURAL JOIN Distancia;
END;
$$
LANGUAGE plpgsql;

-- Funcion para obtener los datos del trabajador que se busca avanzadamente y calcular la distancia
-- Parametros: Labor a buscar, celular usuario, tipo de cobro, cantidad de estrellas, precio minimo, precio maximo
CREATE OR REPLACE FUNCTION get_workers_results_advanced (VARCHAR(50), VARCHAR(10), VARCHAR(10), INTEGER, INTEGER, INTEGER) RETURNS TABLE(cedula_trabajador VARCHAR(10), realiza_precio INT, realiza_tipo VARCHAR(10), labor_descripcion VARCHAR(200),
																						trabajador_estado BIT, trabajador_nombre VARCHAR(70), trabajador_apellido VARCHAR(70), trabajador_calificacion INT,
																						trabajador_foto_perfil VARCHAR(25), direccion_domicilio VARCHAR(70), distancia DOUBLE PRECISION) AS $$
DECLARE
	nombre_labor ALIAS FOR $1;
	celularU ALIAS FOR $2;
	tipoC ALIAS FOR $3;
	cEstrellas ALIAS FOR $4;
	pMin ALIAS FOR $5;
	pMax ALIAS FOR $6;
	idlabor INTEGER := (SELECT id_labor FROM Labor WHERE labor_nombre = nombre_labor);
	ubicacionU GEOGRAPHY := (SELECT direccion_ubicacion FROM Direccion WHERE celular_usuario=celularU);
BEGIN
	RETURN QUERY WITH Trabajador_realiza AS (SELECT Trabajador.cedula_trabajador, Realiza.realiza_precio, Realiza.realiza_tipo, Realiza.labor_descripcion, Realiza.trabajador_estado, Trabajador.trabajador_nombre, Trabajador.trabajador_apellido, Trabajador.trabajador_calificacion,
							Trabajador.trabajador_foto_perfil FROM Trabajador NATURAL JOIN Realiza WHERE id_labor=idlabor AND Realiza.realiza_tipo=tipoC AND Trabajador.trabajador_calificacion=cEstrellas AND Realiza.realiza_precio BETWEEN pMin AND pMax), TR_Direccion AS (SELECT Trabajador_realiza.cedula_trabajador, Trabajador_realiza.realiza_precio, Trabajador_realiza.realiza_tipo, Trabajador_realiza.labor_descripcion, Trabajador_realiza.trabajador_estado,
								Trabajador_realiza.trabajador_nombre, Trabajador_realiza.trabajador_apellido, Trabajador_realiza.trabajador_calificacion, Trabajador_realiza.trabajador_foto_perfil, Direccion.direccion_latitud, Direccion.direccion_longitud, Direccion.direccion_domicilio, Direccion.direccion_ubicacion FROM Trabajador_realiza NATURAL JOIN Direccion),
							Distancia AS (SELECT TR_Direccion.cedula_trabajador, ST_Distance(TR_Direccion.direccion_ubicacion, ubicacionU) AS DistanciaUT FROM TR_Direccion)
							SELECT DISTINCT Distancia.cedula_trabajador, TR_Direccion.realiza_precio, TR_Direccion.realiza_tipo, TR_Direccion.labor_descripcion, TR_Direccion.trabajador_estado, TR_Direccion.trabajador_nombre, TR_Direccion.trabajador_apellido, TR_Direccion.trabajador_calificacion, TR_Direccion.trabajador_foto_perfil, TR_Direccion.direccion_domicilio,
							DistanciaUT FROM TR_Direccion NATURAL JOIN Distancia;
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



--"01010000204E1200004EB4AB90F22153C0F90FE9B7AF030B40"
-- 1987654321
-- Profesor de matemáticas


 --TRIGGERS
 -- Trigger para convertir las coordenadas en puntos para usar con postgis
CREATE TRIGGER trigger_add_geopint BEFORE INSERT ON Direccion
FOR EACH ROW
EXECUTE PROCEDURE add_geopint();


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


--QUERY PARA SELECCIONAR DISTANCIAS

/*
SELECT D.cedula_trabajador, ST_Distance(D.direccion_ubicacion, PL.direccion_ubicacion,true) AS distancia
FROM Direccion D,
LATERAL (
    SELECT cedula_trabajador, direccion_ubicacion FROM Direccion WHERE id_direccion = 1
) AS PL
WHERE D.id_direccion = 2;


*/
