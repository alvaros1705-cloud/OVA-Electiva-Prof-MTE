/**
 * FOTOS DEL EQUIPO
 * Cada burbuja intenta cargar images/equipo/<clave>.jpg. Además, al tocarla se puede
 * subir una foto desde el dispositivo (se recorta en cuadrado y se guarda en este navegador).
 */
(function () {
    'use strict';
    const KEY = 'ova-foto-';
    const figs = [...document.querySelectorAll('#equipo .bubble')];
    if (!figs.length) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.hidden = true;
    document.body.appendChild(input);
    let current = null;

    const read = (k) => { try { return localStorage.getItem(KEY + k); } catch (e) { return null; } };
    const write = (k, v) => { try { v ? localStorage.setItem(KEY + k, v) : localStorage.removeItem(KEY + k); } catch (e) {} };

    figs.forEach((f) => {
        const k = f.dataset.key;
        const img = f.querySelector('.bubble-img');
        const btn = f.querySelector('.bubble-c');
        const rm = f.querySelector('.bubble-rm');
        const original = img.getAttribute('src');
        f.photo = { img, rm, original, k };

        img.addEventListener('load', () => { img.hidden = false; });
        img.addEventListener('error', () => { img.hidden = true; });

        const saved = read(k);
        if (saved) { img.src = saved; rm.hidden = false; }
        else if (img.complete && img.naturalWidth) img.hidden = false;

        btn.addEventListener('click', () => { current = f; input.value = ''; input.click(); });
        rm.addEventListener('click', () => {
            write(k, null);
            rm.hidden = true;
            img.hidden = true;
            img.src = original;
        });
    });

    input.addEventListener('change', () => {
        const file = input.files && input.files[0];
        if (!file || !current) return;
        const { img, rm, k } = current.photo;
        const reader = new FileReader();
        reader.onload = () => {
            const tmp = new Image();
            tmp.onload = () => {
                const size = 320, s = Math.min(tmp.width, tmp.height);
                const cv = document.createElement('canvas');
                cv.width = cv.height = size;
                cv.getContext('2d').drawImage(tmp, (tmp.width - s) / 2, (tmp.height - s) / 2, s, s, 0, 0, size, size);
                const data = cv.toDataURL('image/jpeg', 0.85);
                write(k, data);
                img.src = data;
                rm.hidden = false;
            };
            tmp.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
})();
