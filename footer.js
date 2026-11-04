const sharedFooterMarkup = `
    <div>
        <div class="follow">
            <p>Follow me on:
                <a class="instagram-link" href="https://www.instagram.com/maria.portela.larisch/">
                    <img src="instagram-gradient.svg" alt="Instagram">
                </a>
            </p>
        </div>
        <p>Photos by Henrique Almeida, Anna Tena, Janet Sinica, Katja Illner and Damian Lovegrove</p>
        <p>Copyright © 2024 Maria Portela Larisch</p>
        <p>Impressum</p>
    </div>
`;

document.querySelectorAll("footer[data-site-footer]").forEach((footer) => {
    footer.innerHTML = sharedFooterMarkup;
});
