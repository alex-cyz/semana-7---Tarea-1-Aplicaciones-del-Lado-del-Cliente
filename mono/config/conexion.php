<?php
class ClaseConectar
{
    public $conexion;

    public function ProcedimientoConectar()
    {
        $this->conexion = new mysqli("localhost", "root", "", "mecanica");

        if ($this->conexion->connect_errno) {
            echo "Error al conectar a la base de datos: " . $this->conexion->connect_error;
            exit();
        }

        return $this->conexion;
    }

    public function cerrar()
    {
        $this->conexion->close();
    }
}
?>