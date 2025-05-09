<?php
$ok = true;

// Adatok
$nev = $_POST["nev"] ?? "";
$email = $_POST["email"] ?? "";
$darab = $_POST["darab"] ?? "";
$nap = $_POST["nap"] ?? "";

// Ellenőrzés + kiírás
function ellenoriz($feltetel, $label) {
    global $ok;
    echo "$label: ";
    if ($feltetel) {
        echo htmlspecialchars($_POST[strtolower($label)]) . " Helyes<br>";
    } else {
        echo htmlspecialchars($_POST[strtolower($label)]) . " Hibás!<br>";
        $ok = false;
    }
}

ellenoriz(strlen($nev) >= 8 && strlen($nev) <= 30, "Név");
ellenoriz(filter_var($email, FILTER_VALIDATE_EMAIL), "E-mail");
ellenoriz(is_numeric($darab) && $darab >= 1 && $darab <= 10, "Darab");
$napok = ["hetfo", "kedd", "szerda", "csutortok", "pentek"];
ellenoriz(in_array($nap, $napok), "Nap");

// Mentés, ha minden adat helyes
if ($ok) {
    $conn = mysqli_connect("localhost", "root", "", "aruhaz");
    if (!$conn) {
        die("Kapcsolódási hiba: " . mysqli_connect_error());
    }

    $stmt = $conn->prepare("INSERT INTO rendeles (nev, email, darab, nap) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssis", $nev, $email, $darab, $nap);

    if ($stmt->execute()) {
        echo "<br><strong>Sikeres mentés az adatbázisba!</strong>";
    } else {
        echo "<br>Hiba mentéskor: " . $stmt->error;
    }

    $stmt->close();
    mysqli_close($conn);
}
?>
