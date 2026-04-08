document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 참조
    const svg = document.getElementById('thumbnail-svg');
    const bgRect = document.getElementById('bg-rect');
    const previewText = document.getElementById('preview-text');
    const stop1 = document.querySelector('#bg-gradient stop:first-child');
    const stop2 = document.querySelector('#bg-gradient stop:last-child');

    const textInput = document.getElementById('text-input');
    const fontSizeInput = document.getElementById('font-size');
    const btnFontMinus = document.getElementById('btn-font-minus');
    const btnFontPlus = document.getElementById('btn-font-plus');

    const bgColorInput = document.getElementById('bg-color');
    const bgColorInput2 = document.getElementById('bg-color-2');
    const bgModeGroup = document.getElementById('bg-mode-group');
    const cornerStyleGroup = document.getElementById('corner-style-group');
    const gradientColor2Group = document.getElementById('gradient-color-2');
    const btnRandomColor = document.getElementById('btn-random-color');
    const btnRandomColor2 = document.getElementById('btn-random-color-2');
    const borderRadiusGroup = document.getElementById('border-radius-group');

    // 상태 관리 (기본값)
    let currentBgMode = 'gradient';
    let currentCornerStyle = 'sharp';

    // 버튼 그룹 활성화 처리 함수
    const setupButtonGroup = (group, callback) => {
        const buttons = group.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                callback(btn.dataset.value);
            });
        });
    };

    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');
    const btnApplyRes = document.getElementById('btn-apply-res');

    const btnExportPng = document.getElementById('btn-export-png');
    const btnExportJpg = document.getElementById('btn-export-jpg');
    const btnExportSvg = document.getElementById('btn-export-svg');

    // 텍스트 실시간 반영 및 다중 행 처리 (자동 줄바꿈 포함)
    const updateText = () => {
        const fullText = textInput.value;
        const fontSize = parseInt(fontSizeInput.value) || 0;
        const lineHeight = 1.2;
        const svgWidth = parseInt(svg.getAttribute('width')) || 400;
        const maxWidth = svgWidth * 0.9; // 양옆 5%씩 여백
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `bold ${fontSize}px sans-serif`;

        // 1. 수동 줄바꿈(\n) 처리
        const manualLines = fullText.split('\n');
        const finalLines = [];

        // 2. 각 줄에 대해 자동 줄바꿈 처리
        manualLines.forEach(line => {
            if (!line.trim()) {
                finalLines.push(' ');
                return;
            }

            let currentLine = '';
            // 한글/영문 대응을 위해 글자 단위로 쪼개서 체크
            const chars = Array.from(line); 

            chars.forEach((char, i) => {
                const testLine = currentLine + char;
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && i > 0) {
                    finalLines.push(currentLine);
                    currentLine = char;
                } else {
                    currentLine = testLine;
                }
            });
            finalLines.push(currentLine);
        });
        
        previewText.innerHTML = '';
        
        finalLines.forEach((line, index) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = line;
            tspan.setAttribute('x', '50%');
            
            if (index === 0) {
                const totalHeightOffset = (finalLines.length - 1) * fontSize * lineHeight / 2;
                tspan.setAttribute('dy', `-${totalHeightOffset}px`);
            } else {
                tspan.setAttribute('dy', `${fontSize * lineHeight}px`);
            }
            
            previewText.appendChild(tspan);
        });
    };

    textInput.addEventListener('input', updateText);

    // 글자 크기 실시간 반영
    fontSizeInput.addEventListener('input', (e) => {
        const size = e.target.value;
        if (size > 0) {
            previewText.setAttribute('font-size', size);
            updateText(); // 줄 간격 재계산을 위해 호출
        }
    });

    btnFontMinus.addEventListener('click', () => {
        const currentSize = parseInt(fontSizeInput.value) || 80;
        const newSize = Math.max(10, currentSize - 10);
        fontSizeInput.value = newSize;
        previewText.setAttribute('font-size', newSize);
        updateText();
    });

    btnFontPlus.addEventListener('click', () => {
        const currentSize = parseInt(fontSizeInput.value) || 80;
        const newSize = Math.min(500, currentSize + 10);
        fontSizeInput.value = newSize;
        previewText.setAttribute('font-size', newSize);
        updateText();
    });

    // 배경색 실시간 반영
    const updateBackground = () => {
        const color1 = bgColorInput.value;
        const color2 = bgColorInput2.value;

        if (currentBgMode === 'solid') {
            bgRect.setAttribute('fill', color1);
            gradientColor2Group.classList.add('disabled');
            bgColorInput2.disabled = true;
            btnRandomColor2.disabled = true;
        } else {
            bgRect.setAttribute('fill', 'url(#bg-gradient)');
            stop1.style.stopColor = color1;
            stop2.style.stopColor = color2;
            gradientColor2Group.classList.remove('disabled');
            bgColorInput2.disabled = false;
            btnRandomColor2.disabled = false;
        }
    };

    setupButtonGroup(bgModeGroup, (value) => {
        currentBgMode = value;
        updateBackground();
    });

    bgColorInput.addEventListener('input', updateBackground);
    bgColorInput2.addEventListener('input', updateBackground);

    // 랜덤 색상 버튼
    btnRandomColor.addEventListener('click', () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        bgColorInput.value = randomColor;
        updateBackground();
    });

    btnRandomColor2.addEventListener('click', () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        bgColorInput2.value = randomColor;
        updateBackground();
    });

    // 모서리 스타일 및 둥글기 실시간 반영
    const updateCornerStyle = () => {
        const radius = 40; // 40px 고정

        if (currentCornerStyle === 'sharp') {
            bgRect.setAttribute('rx', 0);
            bgRect.setAttribute('ry', 0);
            borderRadiusGroup.style.display = 'none';
        } else {
            bgRect.setAttribute('rx', radius);
            bgRect.setAttribute('ry', radius);
            borderRadiusGroup.style.display = 'block';
        }
    };

    setupButtonGroup(cornerStyleGroup, (value) => {
        currentCornerStyle = value;
        updateCornerStyle();
    });

    // 해상도 반영
    const updateResolution = () => {
        const w = parseInt(widthInput.value) || 400;
        const h = parseInt(heightInput.value) || 400;
        
        svg.setAttribute('width', w);
        svg.setAttribute('height', h);
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        
        // 텍스트 위치 중앙 배치
        previewText.setAttribute('x', '50%');
        previewText.setAttribute('y', '50%');
        
        updateText(); // 줄 간격 및 수직 위치 재계산을 위해 호출
    };

    btnApplyRes.addEventListener('click', updateResolution);

    // 이미지 내보내기 함수
    const exportImage = (format) => {
        console.log(`[시작] ${format} 이미지 내보내기`);
        
        try {
            // 원본 SVG 복제
            const svgElement = svg.cloneNode(true);
            
            // 스타일 주입
            const style = document.createElement('style');
            style.textContent = `
                text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: bold; }
                tspan { alignment-baseline: central; }
            `;
            svgElement.prepend(style);

            // SVG 데이터를 문자열로 변환 후 Base64 인코딩 (로컬 환경 호환성 위함)
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const encodedData = btoa(unescape(encodeURIComponent(svgData)));
            const dataUri = 'data:image/svg+xml;base64,' + encodedData;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            const w = parseInt(svg.getAttribute('width')) || 400;
            const h = parseInt(svg.getAttribute('height')) || 400;
            
            canvas.width = w;
            canvas.height = h;

            img.onload = () => {
                console.log('[성공] 이미지 로드 완료, 캔버스 렌더링 시작');
                ctx.clearRect(0, 0, w, h);
                
                if (format === 'jpg') {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, w, h);
                }
                
                ctx.drawImage(img, 0, 0, w, h);
                
                try {
                    const dataUrl = canvas.toDataURL(format === 'jpg' ? 'image/jpeg' : 'image/png', 1.0);
                    const link = document.createElement('a');
                    link.download = `thumbnail-${Date.now()}.${format}`;
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    console.log('[완료] 다운로드 트리거됨');
                } catch (canvasErr) {
                    console.error('[오류] 캔버스 데이터 추출 실패:', canvasErr);
                    alert('브라우저 보안 정책으로 인해 이미지 추출이 차단되었습니다. 웹 서버(GitHub Pages 등) 환경에서 실행해주세요.');
                }
            };

            img.onerror = (e) => {
                console.error('[오류] 이미지 변환 실패:', e);
                alert('이미지를 생성하는 동안 오류가 발생했습니다.');
            };

            img.src = dataUri;
        } catch (err) {
            console.error('[오류] 실행 중 예외 발생:', err);
        }
    };

    // SVG 내보내기
    const exportSvg = () => {
        console.log('[시작] SVG 내보내기');
        try {
            const svgData = new XMLSerializer().serializeToString(svg);
            const encodedData = btoa(unescape(encodeURIComponent(svgData)));
            const dataUri = 'data:image/svg+xml;base64,' + encodedData;
            
            const link = document.createElement('a');
            link.download = `thumbnail-${Date.now()}.svg`;
            link.href = dataUri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('[완료] SVG 다운로드 트리거됨');
        } catch (err) {
            console.error('[오류] SVG 내보내기 실패:', err);
        }
    };

    btnExportPng.addEventListener('click', () => exportImage('png'));
    btnExportJpg.addEventListener('click', () => exportImage('jpg'));
    btnExportSvg.addEventListener('click', exportSvg);

    // 초기 실행
    updateText();
    updateBackground();
    updateCornerStyle();
});
