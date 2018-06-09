function addEventListeners() {
    $('#main-container').find('h3 > span').each((index, e) => {
        const element = $(e);
        const container = element.parent().parent().find('.article-content');        

        element.click(() => {
            $(".article-content:visible").hide()
            
            if (container.css('display') === 'none')    {
                container.show();
            } else {
                container.hide();
            }
        })
    });
}
