Kenseo.models.Projects = Backbone.Model.extend({
    // urlRoot: "app/packages/db-projects.json",
    defaults: {
        id: null,
        intro_image_url: null,
        is_archive: null,
        is_owner: null,
        last_updated_date: null,
        name: null
    }
});