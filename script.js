
const sepeteEkleDugmeleri = document.querySelectorAll('.btn-outline-dark');


let sepetUrunler = JSON.parse(localStorage.getItem('sepetUrunler')) || [];


sepeteEkleDugmeleri.forEach((dugme, index) => {
    dugme.addEventListener('click', (event) => {
        event.preventDefault();
        const urunAdi = document.querySelectorAll('.fw-bolder')[index].textContent;
        const urunFiyat = parseFloat(document.querySelectorAll('.fiyat')[index].textContent);

        
        let urunVar = false;
        sepetUrunler.forEach((urun) => {
            if (urun.ad === urunAdi) {
                urun.adet += 1;
                urunVar = true;
            }
        });

        if (!urunVar) {
            sepetUrunler.push({ ad: urunAdi, fiyat: urunFiyat, adet: 1 });
        }

        localStorage.setItem('sepetUrunler', JSON.stringify(sepetUrunler));
        sepetBadgeGuncelle();
    });
});


function sepetBadgeGuncelle() {
    
    const sepetUrunSayisiBadge = document.getElementById('sepetUrunSayisiBadge');
    sepetUrunSayisiBadge.textContent = sepetUrunler.reduce((total, urun) => total + urun.adet, 0);

    
    const sepetButton = document.querySelector('[data-bs-target="#sepetModal"]');
    const toplamAdet = sepetUrunler.reduce((total, urun) => total + urun.adet, 0);
    sepetUrunSayisiBadge.textContent = toplamAdet;
}


document.getElementById('sepetModal').addEventListener('show.bs.modal', modalIceriginiGuncelle);


function modalIceriginiGuncelle() {
    const modalSepetUrunleri = document.getElementById('modalSepetUrunleri');
    modalSepetUrunleri.innerHTML = '';
    let toplamFiyat = 0;

    sepetUrunler.forEach((urun, index) => {
        const modalSepetUrunSatir = document.createElement('tr');
        modalSepetUrunSatir.innerHTML = `
            <td>${urun.ad}</td>
            <td>${urun.fiyat.toFixed(2)} ₺</td>
            <td>${urun.adet}</td>
            <td><button class="btn btn-danger btn-sm urun-cikar" data-index="${index}">Sil</button></td>
        `;
        modalSepetUrunleri.appendChild(modalSepetUrunSatir);
        toplamFiyat += urun.fiyat * urun.adet;
    });

    const toplamFiyatElement = document.querySelector('.modal-toplam-fiyat');
    toplamFiyatElement.textContent = toplamFiyat.toFixed(2);

    
    const silDugmeleri = document.querySelectorAll('.urun-cikar');
    silDugmeleri.forEach((dugme, index) => {
        dugme.addEventListener('click', (event) => {
            const silinecekIndex = parseInt(event.target.getAttribute('data-index'));
            sepetUrunler.splice(silinecekIndex, 1);
            localStorage.setItem('sepetUrunler', JSON.stringify(sepetUrunler));
            modalIceriginiGuncelle(); 
            sepetBadgeGuncelle(); 
        });
    });
}