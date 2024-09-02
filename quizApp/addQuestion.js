document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
    
        const question = form.querySelector('#question').value;
        const answerA = form.querySelector('#answerA').value;
        const answerB = form.querySelector('#answerB').value;
        const answerC = form.querySelector('#answerC').value;
        const answerD = form.querySelector('#answerD').value;
        const correctAnswer = form.querySelector('input[name="correctAnswer"]:checked').value;
        const difficulty = form.querySelector('#difficulty').value;
        

        const newQuestion = {
            question,
            answers: [
                { text: `A) ${answerA}`, correct: correctAnswer === "A" },
                { text: `B) ${answerB}`, correct: correctAnswer === "B" },
                { text: `C) ${answerC}`, correct: correctAnswer === "C" },
                { text: `D) ${answerD}`, correct: correctAnswer === "D" },
            ],
            difficulty
        };
        
        
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push(newQuestion);
        localStorage.setItem('questions', JSON.stringify(questions));
        
        
        alert('Question added successfully!');
        form.reset();
    });
});
