document.getElementById('scan-button').addEventListener('click', function() {
    const videoContainer = document.getElementById('video-container');
    const barcodeResult = document.getElementById('barcode-result');

    // Показать видео контейнер
    videoContainer.classList.remove('hidden');

    // Проверка, запущен ли уже сканер
    if (Quagga.initialized) {
        Quagga.start();
        return;
    }

    // Инициализация QuaggaJS
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            constraints: {
                facingMode: "environment" // Использовать заднюю камеру
            },
            target: videoContainer // Контейнер для видео
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        },
        locate: true
    }, function(err) {
        if (err) {
            console.error(err);
            alert("Ошибка при инициализации сканера.");
            return;
        }
        Quagga.initialized = true; // Флаг инициализации
        Quagga.start();
    });

    // Обработчик результатов
    Quagga.onDetected(function(data) {
        const code = data.codeResult.code;
        barcodeResult.textContent = code;
        Quagga.stop();
        videoContainer.classList.add('hidden');
    });

    // Обработчик ошибок
    Quagga.onProcessed(function(result) {
        if (result) {
            // Можно добавить визуальную индикацию сканирования
            // Например, рисовать рамки вокруг найденных штрих-кодов
        }
    });
});
