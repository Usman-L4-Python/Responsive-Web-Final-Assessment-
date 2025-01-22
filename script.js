
document.addEventListener('DOMContentLoaded', () => {

    
    const form = document.querySelector('form');
  
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault(); 
  
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const rating = document.getElementById('rating').value;
        const comments = document.getElementById('comments').value;
  
        
        if (!name) {
          alert('Please enter your name');
          return;
        }

        
        fetch('/submit-survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            name: name,
            email: email,
            rating: rating,
            comments: comments,
          }),
        })
        .then((response) => response.text())
        .then((data) => {
          
          alert(data); 
          form.reset(); 
        })
        .catch((error) => {
          console.error('Error submitting survey:', error);
          alert('Something went wrong. Please try again.');
        });
      });
    }

});
