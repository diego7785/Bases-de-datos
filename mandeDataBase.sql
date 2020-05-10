DROP TABLE IF EXISTS Trabajador CASCADE;
DROP TABLE IF EXISTS Usuario CASCADE;
DROP TABLE IF EXISTS Labor CASCADE;
DROP TABLE IF EXISTS Cuenta_bancaria CASCADE;
DROP TABLE IF EXISTS Medio_pago CASCADE;
DROP TABLE IF EXISTS Tarjeta_debito CASCADE;
DROP TABLE IF EXISTS Tarjeta_credito CASCADE;
DROP TABLE IF EXISTS Realiza CASCADE;
DROP TABLE IF EXISTS Direccion CASCADE;
DROP TABLE IF EXISTS Servicio CASCADE;
DROP TABLE IF EXISTS Paga CASCADE;


CREATE TABLE Trabajador(
	cedula_trabajador VARCHAR(10) NOT NULL,
	celular_trabajador VARCHAR(10) NOT NULL,
	trabajador_email VARCHAR(50) NOT NULL,
	trabajador_nombre VARCHAR(70) NOT NULL,
	trabajador_apellido VARCHAR(70) NOT NULL,
	trabajador_contrasenia VARCHAR(50) NOT NULL,
	CONSTRAINT pk_trabajador PRIMARY KEY (cedula_trabajador, celular_trabajador)
 );

 CREATE TABLE Usuario(
	 cedula_usuario VARCHAR(10) NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 usuario_email VARCHAR(50) NOT NULL,
	 usuario_nombre VARCHAR(70) NOT NULL,
	 usuario_contrasenia VARCHAR(50) NOT NULL,
	 CONSTRAINT pk_usuario PRIMARY KEY (cedula_usuario, celular_usuario)
 );

 CREATE TABLE Cuenta_bancaria(
 	 numero_cuenta_bancaria VARCHAR(20) NOT NULL,
	 cuenta_bancaria_banco VARCHAR(50) NOT NULL,
	 cuenta_bancaria_tipo VARCHAR(30) NOT NULL,
	 cedula_trabajador VARCHAR(10) NOT NULL,
	 celular_trabajador VARCHAR(10) NOT NULL,
	 CONSTRAINT pk_cuenta_bancaria PRIMARY KEY (numero_cuenta_bancaria),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador, celular_trabajador) REFERENCES Trabajador(cedula_trabajador, celular_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Medio_pago(
	 numero_tarjeta_medio_pago VARCHAR(20) NOT NULL,
	 cedula_usuario VARCHAR(10) NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 medio_pago_banco VARCHAR(50) NOT NULL,
	 CONSTRAINT pk_medio_pago PRIMARY KEY (numero_tarjeta_medio_pago),
	 CONSTRAINT fk_usuario FOREIGN KEY (cedula_usuario, celular_usuario) REFERENCES Usuario(cedula_usuario, celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Tarjeta_debito(
	 numero_tarjeta_medio_pago VARCHAR(20) NOT NULL,
	 tarjeta_debito_numero_cuenta VARCHAR(20) NOT NULL,
	 CONSTRAINT pk_tarjeta_debito PRIMARY KEY (numero_tarjeta_medio_pago),
	 CONSTRAINT fK_medio_pago FOREIGN KEY (numero_tarjeta_medio_pago) REFERENCES Medio_pago(numero_tarjeta_medio_pago) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Tarjeta_credito(
	 numero_tarjeta_medio_pago VARCHAR(20) NOT NULL,
	 tarjeta_credito_fecha_vencimiento DATE NOT NULL,
	 tarjeta_credito_cvc VARCHAR(3) NOT NULL,
	 CONSTRAINT pk_tarjeta_credito PRIMARY KEY (numero_tarjeta_medio_pago),
	 CONSTRAINT fK_medio_pago FOREIGN KEY (numero_tarjeta_medio_pago) REFERENCES Medio_pago(numero_tarjeta_medio_pago) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Labor(
	 id_labor SERIAL NOT NULL,
	 labor_nombre VARCHAR(50) NOT NULL,
	 CONSTRAINT pk_labor PRIMARY KEY (id_labor)
 );

 CREATE TABLE Realiza(
	 id_labor INT NOT NULL,
	 cedula_trabajador VARCHAR(10) NOT NULL,
	 celular_trabajador VARCHAR(10) NOT NULL,
	 realiza_precio INT NOT NULL,
	 labor_descripcion VARCHAR(200) NOT NULL,
	 trabajador_estado BIT NOT NULL,
	 CONSTRAINT pk_realiza PRIMARY KEY (cedula_trabajador, celular_trabajador, id_labor),
	 CONSTRAINT fk_labor FOREIGN KEY (id_labor) REFERENCES Labor(id_labor) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador, celular_trabajador) REFERENCES Trabajador(cedula_trabajador, celular_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Direccion(
	 id_direccion SERIAL NOT NULL,
	 cedula_usuario VARCHAR(10),
	 celular_usuario VARCHAR(10),
	 cedula_trabajador VARCHAR(10),
	 celular_trabajador VARCHAR(10),
	 direccion_latitud VARCHAR(20) NOT NULL,
 	 direccion_longitud VARCHAR(20) NOT NULL,
	 direccion_domicilio VARCHAR(40) NOT NULL,
	 direccion_ciudad VARCHAR(40) NOT NULL,
	 direccion_departamento VARCHAR(40) NOT NULL,
	 CONSTRAINT pk_direccion PRIMARY KEY (id_direccion),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador, celular_trabajador) REFERENCES Trabajador(cedula_trabajador, celular_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_usuario FOREIGN KEY (cedula_usuario, celular_usuario) REFERENCES Usuario(cedula_usuario, celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Servicio(
	 id_servicio SERIAL NOT NULL,
	 cedula_usuario VARCHAR(10) NOT NULL,
	 celular_usuario VARCHAR(10) NOT NULL,
	 cedula_trabajador VARCHAR(10) NOT NULL,
	 celular_trabajador VARCHAR(10) NOT NULL,
	 labor_id INT NOT NULL,
	 servicio_descripcion VARCHAR(100) NOT NULL,
	 servicio_fecha DATE NOT NULL,
	 servicio_hora_inicio TIME NOT NULL,
	 servicio_hora_fin TIME NOT NULL,
	 CONSTRAINT pk_servicio PRIMARY KEY (id_servicio),
	 CONSTRAINT fk_trabajador FOREIGN KEY (cedula_trabajador, celular_trabajador) REFERENCES Trabajador(cedula_trabajador, celular_trabajador) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_usuario FOREIGN KEY (cedula_usuario, celular_usuario) REFERENCES Usuario(cedula_usuario, celular_usuario) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_labor FOREIGN KEY (labor_id) REFERENCES Labor(id_labor) ON UPDATE CASCADE ON DELETE RESTRICT
 );

 CREATE TABLE Paga(
	 numero_tarjeta_medio_pago VARCHAR(20) NOT NULL,
	 id_servicio INT NOT NULL,
	 paga_fecha_pago DATE NOT NULL,
	 CONSTRAINT pk_paga PRIMARY KEY (numero_tarjeta_medio_pago, id_servicio),
	 CONSTRAINT fk_servicio FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio) ON UPDATE CASCADE ON DELETE RESTRICT,
	 CONSTRAINT fk_medio_pago FOREIGN KEY (numero_tarjeta_medio_pago) REFERENCES Medio_pago(numero_tarjeta_medio_pago) ON UPDATE CASCADE ON DELETE RESTRICT
 );


INSERT INTO Labor(labor_nombre) VALUES('Profesor Ingles'),
																			('Paseador de perros'),
																			('Profesor de matemáticas'),
																			('Plomero'),
																			('Electricista');
