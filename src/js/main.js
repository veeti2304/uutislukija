var asetuksetNappi = document.getElementById("asetuksetNappi");

if (window.process !== undefined) {
    asetuksetNappi.style.display = "block";
} else {
    asetuksetNappi.style.display = "none";
}