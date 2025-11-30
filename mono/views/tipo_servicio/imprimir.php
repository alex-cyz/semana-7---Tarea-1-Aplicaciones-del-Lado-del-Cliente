<?php
require_once __DIR__ . '/fpdf/fpdf.php';
require_once('../../models/tipo_servicio.models.php');

// Crear instancia del modelo
$Tipo_Servicio = new Tipo_Servicio();
$datos = $Tipo_Servicio->todos();

class PDF extends FPDF {

    // ENCABEZADO
    function Header() {
        // LOGO (opcional)
        // $this->Image('logo.png', 10, 8, 25); // <-- si tienes logo descomenta

        // Título
        $this->SetFont('Arial','B',16);
        $this->Cell(0,10,'Reporte de Tipos de Servicios - Mecanica',0,1,'C');

        // Fecha
        $this->SetFont('Arial','',10);
        $this->Cell(0,8,'Generado el: '.date("d/m/Y H:i"),0,1,'C');

        // Línea
        $this->Ln(3);
        $this->SetLineWidth(0.8);
        $this->Line(10, $this->GetY(), 200, $this->GetY());
        $this->Ln(5);
    }

    // PIE DE PÁGINA
    function Footer() {
        // Posición 1.5 cm desde abajo
        $this->SetY(-15);
        $this->SetFont('Arial','I',8);
        $this->Cell(0,10,'Pagina '.$this->PageNo().'/{nb}',0,0,'C');
    }
}

// Crear PDF
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

// ENCABEZADOS DE TABLA
$pdf->SetFont('Arial','B',12);
$pdf->SetFillColor(200,220,255); // azul claro
$pdf->Cell(20,10,'ID',1,0,'C',true);
$pdf->Cell(80,10,'Detalle',1,0,'C',true);
$pdf->Cell(30,10,'Valor',1,0,'C',true);
$pdf->Cell(40,10,'Estado',1,1,'C',true);

// CONTENIDO
$pdf->SetFont('Arial','',11);

while ($row = mysqli_fetch_assoc($datos)) {
    $pdf->Cell(20,10,$row["id"],1,0,'C');
    $pdf->Cell(80,10,$row["detalle"],1);
    $pdf->Cell(30,10,'$ '.$row["valor"],1,0,'C');
    $pdf->Cell(40,10, $row["estado"] == 1 ? 'Activo' : 'Inactivo',1,1,'C');
}

$pdf->Output();
?>
