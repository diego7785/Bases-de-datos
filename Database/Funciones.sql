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

-- Funcion para encriptar contrasenias de usuario

CREATE FUNCTION encrypt_Upass() RETURNS TRIGGER AS $$
DECLARE 
BEGIN
	NEW.usuario_contrasenia := 
PGP_SYM_ENCRYPT(NEW.usuario_contrasenia, 'AES_KEY');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Funcion para encriptar cuenta bancaria

CREATE FUNCTION encrypt_bankAccount() RETURNS TRIGGER ASS $$
DECLARE 
BEGIN
	NEW.numero_cuenta_bancaria := 
PGP_SYM_ENCRYPT(NEW.numero_cuenta_bancaria, 'AES_KEY');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

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
