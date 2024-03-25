const KudlaLang = (function() {

    function tokenize(sourceCode) {
        return sourceCode.split(/\s+|\b/);
    }

    function generateJavaScript(tokens) {
        let jsCode = "";
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === 'ademutta') {
                if (!(tokens[i+1] === '(' && tokens.includes('{', i))) {
                    throw new SyntaxError("'ademutta' used incorrectly. Expected structure: ademutta (initialization; condition; increment) { ... }");
                }
                jsCode += 'for';
            } else if (tokens[i] === 'thojale') {
                if (!(tokens[i+1] === '(' && tokens.includes(')', i))) {
                    throw new SyntaxError("'thojale' used incorrectly. Expected structure: thojale(expression);");
                }
                jsCode += 'console.log';
            } else {
                jsCode += tokens[i];
            }
            jsCode += ' ';
        }
        return jsCode;
    }
    

    function transpile(sourceCode) {
        const tokens = tokenize(sourceCode);
        return generateJavaScript(tokens);
    }

    
    function executeScript(scriptContent) {
        try {
            const compiledCode = transpile(scriptContent);
            eval(compiledCode);

        } catch (error) {
            console.error("Error executing script:", error);
        }
    }

    function findAndExecuteScripts() {
        document.querySelectorAll('script[type="text/kudla-lang"]').forEach(script => {
            executeScript(script.textContent || script.innerText);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', findAndExecuteScripts);
    } else {
        findAndExecuteScripts();
    }

    // // or when there is changes to any script tag, done with MutationObserver
    // const observer = new MutationObserver(findAndExecuteScripts);
    // observer.observe(document.body, { childList: true, subtree: true });

    // or an event when new script tag is added
    // document.addEventListener('DOMNodeInserted', findAndExecuteScripts);
    


    // Public API
    return {

        execute: function(scriptContent) {
            try {
                const compiledCode = transpile(scriptContent);
                eval(compiledCode);
            } catch (error) {
                console.error("Error executing script:", error);
            }
        },

        output: function(scriptContent) {
            try {
                const compiledCode = transpile(scriptContent);
                return eval(compiledCode);
            } catch (error) {
                console.error("Error executing script:", error);
            }
        }
        
    }
})();
