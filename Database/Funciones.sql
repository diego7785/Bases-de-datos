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
