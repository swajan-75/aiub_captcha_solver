(function() {
    const style = document.createElement('style');
    style.textContent = `
        #adbx-mini-panel {
            position: fixed; bottom: 20px; right: 20px; z-index: 1000000;
            display: none; 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: rgba(28, 28, 30, 0.75); 
            backdrop-filter: blur(50px) saturate(200%);
            -webkit-backdrop-filter: blur(50px) saturate(200%);
            border: 1px solid rgba(255,255,255,0.15);
            width: 300px; 
            border-radius: 28px;
            padding: 24px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
            
            /* Entry & Exit Animation Timing */
            transition: 
                opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                filter 0.4s ease;
            
            /* Hidden State (Small and Blurry) */
            transform: scale(0.7) translateY(20px); 
            opacity: 0;
            filter: blur(10px);
            
            cursor: move;
            user-select: none;
            touch-action: none;
        }

        /* Visible State (Full size and Sharp) */
        #adbx-mini-panel.show { 
            transform: scale(1) translateY(0); 
            opacity: 1; 
            filter: blur(0px);
        }
        
        #adbx-mini-panel h3 { 
            color: #FFFFFF; 
            margin: 0; 
            font-size: 17px; 
            font-weight: 600; 
            text-align: center;
            padding-bottom: 12px;
            pointer-events: none;
        }
        
        #adbx-input {
            width: 100%; 
            background: rgba(255,255,255,0.1); 
            border: none;
            border-radius: 12px; 
            padding: 14px; 
            color: white; 
            font-size: 17px;
            outline: none; 
            box-sizing: border-box;
            text-align: center;
            user-select: text;
            cursor: text;
        }

        #adbx-error { 
            color: #FF453A;
            font-size: 12px; 
            margin-top: 10px; 
            display: none; 
            text-align: center;
            pointer-events: none;
        }

        .adbx-btn-group { display: flex; gap: 12px; margin-top: 20px; }
        .adbx-btn {
            flex: 1; padding: 14px; border-radius: 14px; border: none; 
            font-weight: 600; font-size: 15px; cursor: pointer;
            transition: 0.2s ease;
        }
        .adbx-btn-solve { background: #007AFF; color: white; }
        #adbx-cancel { background: rgba(255,255,255,0.15); color: white; }
        .adbx-btn:active { transform: scale(0.95); opacity: 0.8; }
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.id = 'adbx-mini-panel';
    panel.innerHTML = `
        <h3>Captcha Calculator</h3>
        <input type="text" id="adbx-input" placeholder="e.g. 53-40" inputmode="text">
        <div id="adbx-error">Invalid Input</div>
        <div class="adbx-btn-group">
            <button class="adbx-btn" id="adbx-cancel">Cancel</button>
            <button class="adbx-btn adbx-btn-solve" id="adbx-solve">Solve</button>
        </div>
    `;
    document.body.appendChild(panel);

    const input = document.getElementById('adbx-input');
    const errorEl = document.getElementById('adbx-error');
    let targetInput = null;


    let isDragging = false;
    let offsetX, offsetY;

    panel.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        isDragging = true;
        offsetX = e.clientX - panel.getBoundingClientRect().left;
        offsetY = e.clientY - panel.getBoundingClientRect().top;
        panel.style.transition = 'none'; 
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        panel.style.left = (e.clientX - offsetX) + 'px';
        panel.style.top = (e.clientY - offsetY) + 'px';
        panel.style.bottom = 'auto';
        panel.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        panel.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease';
    });


    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'CaptchaInputText') {
            targetInput = e.target;
            panel.style.display = 'block';
            
            panel.offsetHeight; 
            panel.classList.add('show');
            input.focus();
        }
    });

    const hidePanel = () => {
        panel.classList.remove('show');

        setTimeout(() => { 
            panel.style.display = 'none'; 
            input.value = ''; 
            errorEl.style.display = 'none'; 
        }, 400);
    };

    document.getElementById('adbx-cancel').onclick = hidePanel;

    const processSolve = () => {
        const val = input.value.trim();
        const match = val.match(/^(\d+)(?:\s*([\+\-\*\/])\s*(\d+))?$/);

        if (match) {
            const num1 = parseFloat(match[1]);
            const operator = match[2];
            const num2 = match[3] ? parseFloat(match[3]) : null;
            let result;

            if (!operator) result = num1;
            else {
                if (operator === '+') result = num1 + num2;
                else if (operator === '-') result = num1 - num2;
                else if (operator === '*') result = num1 * num2;
                else if (operator === '/') result = num2 !== 0 ? num1 / num2 : "Error";
            }

            if (targetInput) {
                targetInput.value = result;
                targetInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            hidePanel();
        } else {
            errorEl.style.display = 'block';
        }
    };

    document.getElementById('adbx-solve').onclick = processSolve;
    input.onkeydown = (e) => { 
        if (e.key === 'Enter') processSolve(); 
        if (e.key === 'Escape') hidePanel();
    };
})();