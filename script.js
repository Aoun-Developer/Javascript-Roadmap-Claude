const roadmapData = {
    0: ['What is JavaScript', 'How JavaScript runs in browser', 'Client-Server basics', 'HTML + CSS overview', 'Browser vs Node.js', 'JavaScript Engines (V8)', 'ECMAScript standards', 'Interpreted vs Compiled'],
    1: ['var, let, const', 'Primitive data types', 'Non-primitive data type (object)', 'Type coercion', 'typeof operator', 'Truthy & falsy values', 'Arithmetic operators', 'Assignment operators', 'Comparison operators (== vs ===)', 'Logical operators', 'Nullish coalescing (??)', 'Optional chaining (?.)'],
    2: ['if / else / else if', 'switch statement', 'for loop', 'while loop', 'do...while loop', 'break & continue', 'Nested loops', 'Ternary operator'],
    3: ['Function declarations', 'Function expressions', 'Arrow functions', 'Parameters & arguments', 'Default parameters', 'Return values', 'Function scope', 'Call stack basics', 'Higher-order functions', 'Callback functions', 'Pure vs impure functions'],
    4: ['Object literals', 'Properties & methods', 'Dot vs bracket notation', 'this keyword', 'Object destructuring', 'Object methods', 'Object.keys/values/entries', 'Shallow vs deep copy', 'Array creation', 'Array indexing', 'push/pop/shift/unshift', 'slice/splice', 'forEach/map/filter/reduce/find', 'some/every', 'Array destructuring'],
    5: ['What is the DOM', 'DOM tree', 'getElementById/querySelector', 'innerText/innerHTML/textContent', 'Attributes & classes', 'Styling via JavaScript', 'Creating & removing elements', 'addEventListener', 'Event object', 'Event bubbling & capturing', 'Event delegation'],
    6: ['Execution context', 'Global vs local scope', 'Scope chain', 'Hoisting', 'Closures', 'Lexical environment', 'call/apply/bind', 'Function currying', 'Debouncing', 'Throttling'],
    7: ['Synchronous vs asynchronous', 'Web APIs', 'Event loop', 'Callback hell', 'Promises', 'then/catch/finally', 'Promise chaining', 'async/await', 'try/catch error handling', 'Promise.all', 'Promise.race', 'Promise.any', 'Promise.allSettled'],
    8: ['OOP concepts', 'Constructor functions', 'Prototypes', 'Prototype chain', '__proto__ vs prototype', 'ES6 Classes', 'constructor method', 'Inheritance', 'super keyword', 'Encapsulation', 'Polymorphism'],
    9: ['ES Modules (import/export)', 'Default vs named exports', 'LocalStorage', 'SessionStorage', 'Cookies', 'Fetch API', 'REST APIs', 'JSON handling', 'CORS basics'],
    10: ['Memory management', 'Garbage collection', 'Avoiding memory leaks', 'Time & space complexity', 'Code optimization', 'Secure coding practices', 'XSS basics', 'CSRF basics', 'Clean code principles', 'JavaScript design patterns'],
    11: ['Browser DevTools debugging', 'Breakpoints & call stack', 'Error handling strategies', 'Unit testing concepts', 'Writing testable JavaScript', 'Linting (ESLint)', 'Code formatting (Prettier)', 'Build tools (Vite/Webpack)', 'V8 engine internals', 'JIT compilation', 'Web Workers', 'Service Workers', 'Metaprogramming', 'Advanced design patterns']
};

function initializeRoadmap() {
    Object.keys(roadmapData).forEach(level => {
        const topicsContainer = document.getElementById(`topics-${level}`);
        roadmapData[level].forEach((topic, index) => {
            const topicId = `topic-${level}-${index}`;
            const isCompleted = localStorage.getItem(topicId) === 'true';

            const topicDiv = document.createElement('div');
            topicDiv.className = `topic ${isCompleted ? 'completed' : ''}`;
            topicDiv.innerHTML = `
                <input type="checkbox" id="${topicId}" ${isCompleted ? 'checked' : ''} onchange="toggleTopic('${topicId}')">
                <label for="${topicId}">${topic}</label>
            `;
            topicsContainer.appendChild(topicDiv);
        });
    });
    updateProgress();
}

function toggleLevel(level) {
    const content = document.getElementById(`content-${level}`);
    const toggle = document.getElementById(`toggle-${level}`);
    content.classList.toggle('active');
    toggle.classList.toggle('active');
}

function toggleTopic(topicId) {
    const checkbox = document.getElementById(topicId);
    const topicDiv = checkbox.parentElement;

    if (checkbox.checked) {
        localStorage.setItem(topicId, 'true');
        topicDiv.classList.add('completed');
    } else {
        localStorage.removeItem(topicId);
        topicDiv.classList.remove('completed');
    }

    updateProgress();
}

function updateProgress() {
    let totalTopics = 0;
    let completedTopics = 0;

    Object.keys(roadmapData).forEach(level => {
        roadmapData[level].forEach((topic, index) => {
            totalTopics++;
            const topicId = `topic-${level}-${index}`;
            if (localStorage.getItem(topicId) === 'true') {
                completedTopics++;
            }
        });
    });

    const percentage = Math.round((completedTopics / totalTopics) * 100);

    document.getElementById('totalTopics').textContent = totalTopics;
    document.getElementById('completedTopics').textContent = completedTopics;
    document.getElementById('progressPercent').textContent = percentage + '%';
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressFill').textContent = percentage + '%';
}

// Initialize on load
initializeRoadmap();