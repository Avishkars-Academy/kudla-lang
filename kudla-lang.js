const KudlaLang = (function() {

    function tokenize(sourceCode) {
        return sourceCode.split(/\s+|\b/);
    }

    function generateJavaScript(tokens) {
        let jsCode = "";
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === 'ademutta') {
                // Check for '(' after 'ademutta' and '{' somewhere after that
                if (!(tokens[i+1] === '(' && tokens.includes('{', i))) {
                    throw new SyntaxError("'ademutta' used incorrectly. Expected structure: ademutta (initialization; condition; increment) { ... }");
                }
                jsCode += 'for';
            } else if (tokens[i] === 'thojale') {
                // Check for '(' immediately after 'thojale' and ')' somewhere after that
                if (!(tokens[i+1] === '(' && tokens.includes(')', i))) {
                    throw new SyntaxError("'thojale' used incorrectly. Expected structure: thojale(expression);");
                }
                jsCode += 'console.log';
            } else {
                jsCode += tokens[i];
            }
            jsCode += ' '; // Adding space for readability, though this is simplistic
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

    // Public API
    return {

        
        
    };
})();
