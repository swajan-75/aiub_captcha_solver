(function() {
    const style = document.createElement('style');
    style.textContent = `
        #adbx-mini-panel {
            position: fixed; bottom: 20px; right: 20px; z-index: 1000000;
            display: none; font-family: 'Segoe UI', Tahoma, sans-serif;
            background: #0f172a; border: 1px solid rgba(255,255,255,0.1);
            width: 300px; border-radius: 20px; padding: 20px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(20px); opacity: 0;
        }
        #adbx-mini-panel.show { transform: translateY(0); opacity: 1; }
        #adbx-mini-panel h3 { color: #497FAF; margin: 0; font-size: 16px; font-weight: 800; text-transform: uppercase; }
        #adbx-mini-panel p { color: #64748b; font-size: 9px; font-weight: 700; margin: 4px 0 15px 0; letter-spacing: 1px; }
        #adbx-input {
            width: 100%; background: rgba(255,255,255,0.05); border: 1px solid #d1edf1;
            border-radius: 8px; padding: 12px; color: white; font-size: 16px;
            outline: none; transition: 0.2s; box-sizing: border-box;
        }
        #adbx-input:focus { border-color: #497FAF; box-shadow: 0 0 0 3px rgba(73, 127, 175, 0.2); }
        #adbx-error { color: #ff4d4d; font-size: 10px; margin-top: 8px; display: none; font-weight: bold; }
        .adbx-btn-group { display: flex; gap: 8px; margin-top: 15px; }
        .adbx-btn {
            flex: 1; padding: 10px; border-radius: 8px; border: none; font-weight: 700;
            font-size: 11px; text-transform: uppercase; cursor: pointer; transition: 0.2s;
        }
        .adbx-btn-solve { background: #497FAF; color: white; }
        .adbx-btn:hover { opacity: 0.8; transform: translateY(-1px); }
    `;
    document.head.appendChild(style);


    const panel = document.createElement('div');
    panel.id = 'adbx-mini-panel';
    panel.innerHTML = `
        <h3>ADBX Smart Solver</h3>
        <p>AIUB Portal Assistant</p>
        <input type="text" id="adbx-input" placeholder="e.g. 53-40 or 13">
        <div id="adbx-error">Invalid Input! Use '6+7' or '87'</div>
        <div class="adbx-btn-group">
            <button class="adbx-btn" style="background:rgba(255,255,255,0.05);color:white" id="adbx-cancel">Cancel</button>
            <button class="adbx-btn adbx-btn-solve" id="adbx-solve">Solve</button>
        </div>
    `;
    document.body.appendChild(panel);

    const input = document.getElementById('adbx-input');
    const errorEl = document.getElementById('adbx-error');
    let targetInput = null;

    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'CaptchaInputText') {
            targetInput = e.target;
            panel.style.display = 'block';
            setTimeout(() => panel.classList.add('show'), 10);
            input.focus();
        }
    });

    const hidePanel = () => {
        panel.classList.remove('show');
        setTimeout(() => { panel.style.display = 'none'; input.value = ''; errorEl.style.display = 'none'; }, 300);
    };

    document.getElementById('adbx-cancel').onclick = hidePanel;


    const processSolve = () => {
        const val = input.value.trim();
        if (!val) return;


        const match = val.match(/^(\d+)(?:\s*([\+\-\*\/])\s*(\d+))?$/);

        if (match) {
            const num1 = parseFloat(match[1]);
            const operator = match[2];
            const num2 = match[3] ? parseFloat(match[3]) : null;
            let result;

            if (!operator) {
                result = num1;
            } else {
                switch (operator) {
                    case '+': result = num1 + num2; break;
                    case '-': result = num1 - num2; break;
                    case '*': result = num1 * num2; break;
                    case '/': result = num2 !== 0 ? num1 / num2 : "Error"; break;
                }
            }

            if (targetInput) {
                targetInput.value = result;
               
                targetInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            hidePanel();
        } else {
            errorEl.style.display = 'block';
            input.style.borderColor = '#ff4d4d';
        }
    };

    document.getElementById('adbx-solve').onclick = processSolve;
    input.onkeydown = (e) => { 
        if (e.key === 'Enter') processSolve(); 
        if (e.key === 'Escape') hidePanel();
    };
})();