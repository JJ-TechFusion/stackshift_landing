// Terminal Animation
const terminalContent = document.getElementById('terminal-content');
const terminalLines = [
    { text: '$ git push origin main', delay: 500 },
    { text: '✓ Detected Next.js 14 application', delay: 1500, color: 'text-green-400' },
    { text: '✓ Installing dependencies... (12s)', delay: 2500, color: 'text-gray-400' },
    { text: '✓ Building production bundle... (45s)', delay: 3500, color: 'text-gray-400' },
    { text: '✓ Deploying to af-south-1... (8s)', delay: 4500, color: 'text-gray-400' },
    { text: '', delay: 5000 }, // Spacer
    { text: '🚀 Deployed to https://my-app.stackshift.cloud', delay: 5500, color: 'text-primary font-bold' },
    { text: 'Build time: 1m 5s', delay: 6000, color: 'text-gray-500' },
    { text: 'Status: Live ✓', delay: 6200, color: 'text-green-400' }
];

async function typeWriter(text, element, speed = 50) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function runTerminal() {
    terminalContent.innerHTML = '';
    
    for (const line of terminalLines) {
        const lineEl = document.createElement('div');
        lineEl.className = `mb-2 font-mono ${line.color || ''}`;
        terminalContent.appendChild(lineEl);
        
        if (line.text.startsWith('$')) {
            await typeWriter(line.text, lineEl);
        } else {
            await new Promise(resolve => setTimeout(resolve, line.delay - (terminalLines[terminalLines.indexOf(line)-1]?.delay || 0)));
            lineEl.textContent = line.text;
        }
    }
}

// Start animation when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runTerminal();
            observer.unobserve(entry.target);
        }
    });
});
observer.observe(terminalContent);


// Fade-in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.style.opacity = '1';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-scroll').forEach(el => {
    el.style.opacity = '0';
    fadeObserver.observe(el);
});


// Pricing Calculator
const projectsInput = document.getElementById('calc-projects');
const ramInput = document.getElementById('calc-ram');
const totalDisplay = document.getElementById('calc-total');
const projectsVal = document.getElementById('calc-projects-val');
const ramVal = document.getElementById('calc-ram-val');

function updateCalculator() {
    const projects = parseInt(projectsInput.value);
    const ramIndex = parseInt(ramInput.value);
    
    // Map slider values to RAM
    const ramMap = { 1: 0.5, 2: 1, 3: 2, 4: 4 }; // GB
    const ram = ramMap[ramIndex];
    
    projectsVal.textContent = projects;
    ramVal.textContent = ram + 'GB';
    
    // Simple logic: Base $5/project + $5/GB RAM
    const cost = (projects * 5) + (projects * ram * 5);
    
    totalDisplay.textContent = '$' + cost;
}

if (projectsInput && ramInput) {
    projectsInput.addEventListener('input', updateCalculator);
    ramInput.addEventListener('input', updateCalculator);
}


// FAQ Accordion
window.toggleFaq = function(button) {
    const content = button.nextElementSibling;
    const arrow = button.querySelector('span:last-child');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        arrow.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
    }
}
