(function (store) {

    store.Sites = {
        "odata.metadata": "http://127.0.0.1:8000/api/$metadata#Sites",
        "sites": [
            {"id": 1, "name": "Google", "url": "http://www.google.com"},
            {"id": 2, "name": "Microsoft", "url": "http://www.microsoft.com"},
        ]
    };


}(window.store || (window.store = {})));
