document.addEventListener('DOMContentLoaded', () => {
    // Console-ში შეტყობინების გამოტანა, როცა გვერდი ჩაიტვირთება
    console.log("JavaScript ფაილი წარმატებით ჩაიტვირთა!");

    // ღილაკზე დაჭერის ფუნქციონალი
    const alertButton = document.getElementById('alertButton');
    if (alertButton) {
        alertButton.addEventListener('click', () => {
            alert('მოგესალმებით PWA აპლიკაციიდან!');
        });
    }
});
