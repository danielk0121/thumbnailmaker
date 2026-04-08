document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 참조
    const svg = document.getElementById('thumbnail-svg');
    const bgRect = document.getElementById('bg-rect');
    const previewText = document.getElementById('preview-text');
    const stop1 = document.querySelector('#bg-gradient stop:first-child');
    const stop2 = document.querySelector('#bg-gradient stop:last-child');

    const textInput = document.getElementById('text-input');
    const fontSizeInput = document.getElementById('font-size');
    
    const bgColorInput = document.getElementById('bg-color');
    const btnRandomColor = document.getElementById('btn-random-color');
    const borderRadiusInput = document.getElementById('border-radius');
    const borderRadiusVal = document.getElementById('border-radius-val');

    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');

    const btnExportPng = document.getElementById('btn-export-png');
    const btnExportJpg = document.getElementById('btn-export-jpg');
    const btnExportSvg = document.getElementById('btn-export-svg');

    // 텍스트 실시간 반영
    textInput.addEventListener('input', (e) => {
        previewText.textContent = e.target.value;
    });

    // 글자 크기 실시간 반영
    fontSizeInput.addEventListener('input', (e) => {
        const size = e.target.value;
        if (size > 0) {
            previewText.setAttribute('font-size', size);
        }
    });

    // 배경색 실시간 반영 (그라데이션 제거 후 단색으로 설정 가능하지만, 여기서는 그라데이션 첫번째 색상만 변경)
    bgColorInput.addEventListener('input', (e) => {
        const color = e.target.value;
        stop1.style.stopColor = color;
        // 단색 느낌을 주기 위해 두번째 색상도 비슷하게 변경하거나, 아예 단색 fill로 바꿀 수 있음
    });

    // 랜덤 색상 버튼
    btnRandomColor.addEventListener('click', () => {
        const randomColor1 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        const randomColor2 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        
        stop1.style.stopColor = randomColor1;
        stop2.style.stopColor = randomColor2;
        bgColorInput.value = randomColor1;
    });

    // 모서리 라운드 실시간 반영
    borderRadiusInput.addEventListener('input', (e) => {
        const radius = e.target.value;
        bgRect.setAttribute('rx', radius);
        bgRect.setAttribute('ry', radius);
        borderRadiusVal.textContent = radius;
    });

    // 해상도 실시간 반영
    const updateResolution = () => {
        const w = widthInput.value;
        const h = heightInput.value;
        svg.setAttribute('width', w);
        svg.setAttribute('height', h);
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        // 텍스트 중앙 정렬 유지
        previewText.setAttribute('x', '50%');
        previewText.setAttribute('y', '50%');
    };

    widthInput.addEventListener('input', updateResolution);
    heightInput.addEventListener('input', updateResolution);

    // 이미지 내보내기 함수
    const exportImage = (format) => {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        const w = widthInput.value;
        const h = heightInput.value;
        canvas.width = w;
        canvas.height = h;

        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            if (format === 'jpg') {
                ctx.fillStyle = '#ffffff'; // JPG용 배경색
                ctx.fillRect(0, 0, w, h);
            }
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 0.9);
            const link = document.createElement('a');
            link.download = `thumbnail.${format}`;
            link.href = dataUrl;
            link.click();
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };

    // SVG 내보내기
    const exportSvg = () => {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const link = document.createElement('a');
        link.download = 'thumbnail.svg';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    btnExportPng.addEventListener('click', () => exportImage('png'));
    btnExportJpg.addEventListener('click', () => exportImage('jpg'));
    btnExportSvg.addEventListener('click', exportSvg);
});
