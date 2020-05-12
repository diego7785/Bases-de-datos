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
DROP FUNCTION IF EXISTS add_geopint;
DROP TRIGGER IF EXISTS trigger_add_geopint ON Direccion;

CREATE TABLE Trabajador(
	cedula_trabajador VARCHAR(10) NOT NULL,
	celular_trabajador VARCHAR(10) NOT NULL,
	trabajador_email VARCHAR(50) NOT NULL,
	trabajador_nombre VARCHAR(70) NOT NULL,
	trabajador_apellido VARCHAR(70) NOT NULL,
	trabajador_contrasenia VARCHAR(50) NOT NULL,
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
	 usuario_contrasenia VARCHAR(50) NOT NULL,
	 usuario_foto_perfil VARCHAR(25),
	 usuario_foto_id_frente VARCHAR(25) NOT NULL,
	 usuario_foto_id_atras VARCHAR(25) NOT NULL,
	 usuario_foto_recibo VARCHAR(25) NOT NULL,
	 CONSTRAINT pk_usuario PRIMARY KEY (celular_usuario)
 );

 CREATE TABLE Cuenta_bancaria(
 	 numero_cuenta_bancaria VARCHAR(20) NOT NULL,
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
	 direccion_domicilio VARCHAR(40) NOT NULL,
	 direccion_ciudad VARCHAR(40) NOT NULL,
	 direccion_departamento VARCHAR(40) NOT NULL,
	 direccion_ubicacion GEOGRAPHY(POINT,4686),
	 CONSTRAINT pk_direccion PRIMARY KEY (id_direccion),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador) REFERENCES Trabajador(cedula_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Servicio(
	 id_servicio SERIAL NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 cedula_trabajador VARCHAR(10) NOT NULL,
	 labor_id INT NOT NULL,
	 servicio_descripcion VARCHAR(200) NOT NULL,
	 servicio_fecha DATE NOT NULL,
	 servicio_hora_inicio TIME NOT NULL,
	 servicio_hora_fin TIME NOT NULL,
	 paga_fecha_pago DATE NOT NULL,
	 paga_valor_pago INT NOT NULL,
	 CONSTRAINT pk_servicio PRIMARY KEY (id_servicio),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador) REFERENCES Trabajador(cedula_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_labor FOREIGN KEY (labor_id) REFERENCES Labor(id_labor) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Servicio_pago(
 	id_servicio INT UNIQUE NOT NULL,
	numero_tarjeta VARCHAR(20) UNIQUE NOT NULL,
	paga_tipo VARCHAR(8) UNIQUE NOT NULL,
	CONSTRAINT pk_servicio_pago PRIMARY KEY (id_servicio, numero_tarjeta),
	CONSTRAINT fK_servicio FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio) ON UPDATE CASCADE ON DELETE RESTRICT
 );
 CREATE TABLE Tarjeta_debito(
	 numero_tarjeta_debito VARCHAR(20) NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 paga_tipo VARCHAR(8) NOT NULL DEFAULT ('debito'),
	 tarjeta_debito_banco VARCHAR(50) NOT NULL,
	 tarjeta_debito_numero_cuenta VARCHAR(20) NOT NULL,
	 CONSTRAINT pk_tarjeta_debito PRIMARY KEY (numero_tarjeta_debito),
	 CONSTRAINT fK_servicio_pago FOREIGN KEY (numero_tarjeta_debito) REFERENCES Servicio_pago(numero_tarjeta) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fK_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fK_servicio_pago_tipo FOREIGN KEY (paga_tipo) REFERENCES Servicio_pago(paga_tipo) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Tarjeta_credito(
	 numero_tarjeta_credito VARCHAR(20) NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 paga_tipo VARCHAR(8) NOT NULL DEFAULT ('credito'),
	 tarjeta_credito_fecha_vencimiento VARCHAR(5) NOT NULL,
	 tarjeta_credito_cvc VARCHAR(4) NOT NULL,
	 CONSTRAINT pk_tarjeta_credito PRIMARY KEY (numero_tarjeta_credito),
	 CONSTRAINT fK_servicio_pago FOREIGN KEY (numero_tarjeta_credito) REFERENCES Servicio_pago(numero_tarjeta) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fK_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fK_servicio_pago_tipo FOREIGN KEY (paga_tipo) REFERENCES Servicio_pago(paga_tipo) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 --TRIGGERS

CREATE FUNCTION add_geopint() RETURNS TRIGGER AS $$
DECLARE
BEGIN
    NEW.direccion_ubicacion := ST_SetSRID(ST_MakePoint(NEW.direccion_longitud,NEW.direccion_latitud),4686);
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_add_geopint BEFORE INSERT ON Direccion
FOR EACH ROW
EXECUTE PROCEDURE add_geopint();


INSERT INTO Labor(labor_nombre) VALUES('Profesor Ingles'),
																			('Paseador de perros'),
																			('Profesor de matemáticas'),
																			('Plomero'),
																			('Electricista');

--QUERY PARA SELECCIONAAR DISTANCIAS

/*
SELECT D.cedula_trabajador, ST_Distance(D.direccion_ubicacion, PL.direccion_ubicacion,true) AS distancia
FROM Direccion D,
LATERAL (
    SELECT cedula_trabajador, direccion_ubicacion FROM Direccion WHERE id_direccion = 1
) AS PL
WHERE D.id_direccion = 2;
*/
