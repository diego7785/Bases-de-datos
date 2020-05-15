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
DROP TRIGGER IF EXISTS trigger_add_geopint ON Direccion;
DROP FUNCTION IF EXISTS encrypt_Wpass;
DROP TRIGGER IF EXISTS trigger_encrypt_Wpass ON Trabajador;
DROP FUNCTION IF EXISTS encrypt_Upass;
DROP TRIGGER IF EXISTS trigger_encrypt_Upass ON Usuario;
DROP FUNCTION IF EXISTS encrypt_bankAccount;
DROP TRIGGER IF EXISTS trigger_encrypt_bankAccount ON Cuenta_bancaria;
DROP FUNCTION IF EXISTS encrypt_Tdebit;
DROP TRIGGER IF EXISTS trigger_encrypt_Tdebit ON Tarjeta_debito;
DROP FUNCTION IF EXISTS encrypt_Tcredit;
DROP TRIGGER IF EXISTS trigger_encrypt_Tcredit ON Tarjeta_credito;

CREATE TABLE Trabajador(
	cedula_trabajador VARCHAR(10) NOT NULL,
	celular_trabajador VARCHAR(10) NOT NULL,
	trabajador_email VARCHAR(50) NOT NULL,
	trabajador_nombre VARCHAR(70) NOT NULL,
	trabajador_apellido VARCHAR(70) NOT NULL,
	trabajador_contrasenia VARCHAR(255) NOT NULL,
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
	 direccion_domicilio VARCHAR(40) NOT NULL,
	 direccion_ciudad VARCHAR(40) NOT NULL,
	 direccion_departamento VARCHAR(40) NOT NULL,
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
	 servicio_hora_fin TIME NOT NULL,
	 paga_fecha_pago DATE NOT NULL,
	 paga_valor_pago INT NOT NULL,
	 numero_tarjeta_debito VARCHAR(255) NOT NULL,
	 numero_tarjeta_credito VARCHAR(255) NOT NULL,
	 CONSTRAINT pk_servicio PRIMARY KEY (id_servicio),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador) REFERENCES Trabajador(cedula_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_usuario FOREIGN KEY (celular_usuario) REFERENCES Usuario(celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_labor FOREIGN KEY (labor_id) REFERENCES Labor(id_labor) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_tarjeta_debito FOREIGN KEY (numero_tarjeta_debito) REFERENCES Tarjeta_debito(numero_tarjeta_debito) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_tarjeta_credito FOREIGN KEY (numero_tarjeta_credito) REFERENCES Tarjeta_credito(numero_tarjeta_credito) ON UPDATE CASCADE ON DELETE RESTRICT
 );



 --TRIGGERS

-- Funcion para convertir las coordenadas en puntos para usar con postgis
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

-- Funcion para encriptar contrasenias de trabajador

CREATE FUNCTION encrypt_Wpass() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.trabajador_contrasenia :=
PGP_SYM_ENCRYPT(NEW.trabajador_contrasenia, 'AES_KEY');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_encrypt_Wpass BEFORE INSERT OR UPDATE ON Trabajador
FOR EACH ROW
EXECUTE PROCEDURE encrypt_Wpass();

-- Funcion para encriptar contrasenias de usuario

CREATE FUNCTION encrypt_Upass() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.usuario_contrasenia :=
PGP_SYM_ENCRYPT(NEW.usuario_contrasenia, 'AES_KEY');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_encrypt_Upass BEFORE INSERT OR UPDATE ON Usuario
FOR EACH ROW
EXECUTE PROCEDURE encrypt_Upass();

-- Funcion para encriptar cuenta bancaria

CREATE FUNCTION encrypt_bankAccount() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.numero_cuenta_bancaria :=
PGP_SYM_ENCRYPT(NEW.numero_cuenta_bancaria, 'AES_KEY');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_encrypt_bankAccount BEFORE INSERT ON Cuenta_bancaria
FOR EACH ROW
EXECUTE PROCEDURE encrypt_bankAccount();

-- Funcion para encriptar Tarjeta debito

CREATE FUNCTION encrypt_Tdebit() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.numero_tarjeta_debito :=
PGP_SYM_ENCRYPT(NEW.numero_tarjeta_debito, 'AES_KEY');

	NEW.tarjeta_debito_numero_cuenta :=
PGP_SYM_ENCRYPT(NEW.tarjeta_debito_numero_cuenta, 'AES_KEY');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_encrypt_Tdebit BEFORE INSERT ON Tarjeta_debito
FOR EACH ROW
EXECUTE PROCEDURE encrypt_Tdebit();

-- Funcion para encriptar Tarjeta credito

CREATE FUNCTION encrypt_Tcredit() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.numero_tarjeta_credito :=
PGP_SYM_ENCRYPT(NEW.numero_tarjeta_credito, 'AES_KEY');

	NEW.tarjeta_credito_cvc :=
PGP_SYM_ENCRYPT(NEW.tarjeta_credito_cvc, 'AES_KEY');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_encrypt_Tcredit BEFORE INSERT ON Tarjeta_credito
FOR EACH ROW
EXECUTE PROCEDURE encrypt_Tcredit();


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
