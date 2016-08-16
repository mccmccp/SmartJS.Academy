function Collection(obj) {
    copy(this, obj);
}

function copy(self, obj) {
    Object.keys(obj).forEach(function (key) {
        self[key] = obj[key];
    });
    Collection.clone = Symbol('clone');
    self[Collection.clone] = _.cloneDeep(self);
}

Collection.url = 'https://jsonplaceholder.typicode.com/todos';

Collection.list = function (callback) {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', self.url);
    xhr.send();
    xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === xhr.DONE) {
                if (~~(xhr.status / 100) === 2) {
                    var response = JSON.parse(xhr.responseText);
                    callback(null, response);
                } else {
                    callback(xhr.statusText);
                }
            }
        }
    );

};

function onload(err, arrColl) {
    return arrColl;
}


Collection.prototype.save = function (cb) {
    var url = this.constructor.url;
    var self = this;
    if (!this.id && this.id !== 0) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.send(JSON.stringify(this));
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === xhr.DONE) {
                if (~~(xhr.status / 100) === 2) {
                    var response = JSON.parse(xhr.responseText);
                    self.id = response.id;
                    cb(null);
                } else {
                    cb(request.statusText);
                }
            }
        });
    } else {
        var request = new XMLHttpRequest();
        request.open('PATCH', url + "/" + this.id);
        var newObj = {};
        for (var key in this) {
            if (this.hasOwnProperty(key) && this[key] !== this[Collection.clone][key]) {
                newObj[key] = this[key];
            }
        }
        request.send(JSON.stringify(newObj));

        request.addEventListener("readystatechange", function () {
            if (request.readyState === request.DONE) {

                if (parseInt(request.status / 100) === 2) {
                    var response = JSON.parse(request.responseText);
                    copy(self, response);
                    cb(null);
                } else {
                    cb(request.statusText);
                }
            }
        });
    }
};

function callbackSave(b) {
    console.log(b);
}

Collection.get = function (id, callback) {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', self.url + '/' + id);
    xhr.send();

    xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === xhr.DONE) {
                if (~~(xhr.status / 100) === 2) {
                    var response = JSON.parse(xhr.responseText);
                    callback(null, new self(response));
                } else {
                    callback(xhr.statusText);
                }
            }
        }
    );
};


function User(obj) {
    Collection.call(this, obj);
}

User.prototype = Object.create(Collection.prototype);
User.prototype.constructor = User;
User.url = 'http://jsonplaceholder.typicode.com/users';
User.list = Collection.list;
User.get = Collection.get;
User.prototype.save = function (cb) {
    function correctMail(str) {
        var regExp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');
        return regExp.test(str);
    }

    if (this.name && this.username && this.email && correctMail(this.email)) {
        Collection.prototype.save.call(this, cb);
    }
};

User.prototype.getAlbums = function () {
    Album.list(function (err, albums) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, albums);
    })
};


function Album(obj) {
    Collection.call(this, obj);
}

Album.prototype = Object.create(Collection.prototype);
Album.prototype.constructor = Album;
Album.url = 'http://jsonplaceholder.typicode.com/albums';
Album.list = Collection.list;
Album.get = Collection.get;
Album.prototype.save = function (cb) {
    if (this.userId && this.title) {
        Collection.prototype.save.call(this, cb);
    }
};

User.prototype.getAlbums = function () {
    Photos.list(function (err, photos) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, photos);
    })
};


function Photo(obj) {
    Collection.call(this, obj);
}

Photo.prototype = Object.create(Collection.prototype);
Photo.prototype.constructor = Photo;
Photo.url = 'http://jsonplaceholder.typicode.com/photos';
Photo.list = Collection.list;
Photo.get = Collection.get;


function render() {
    getAllData(function (err, data) {
        if (err) {
            alert(err)
        }
        var body = document.querySelector('body');
        var ul = document.createElement('ul');
        data.users.forEach(function (item) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.textContent = item.name;
            a.style.cursor = 'pointer';
            a.addEventListener('click', function (event) {
                if (ul2.style.display === 'none') {
                    ul2.style.display = 'block';
                } else {
                    ul2.style.display = 'none';
                }
            });
            var ul2 = document.createElement('ul');
            ul2.style.display = 'none';
            data.albums.forEach(function (item2) {
                if (item.id === item2.userId) {
                    var li2 = document.createElement('li');
                    var a2 = document.createElement('a');
                    a2.textContent = item2.title;
                    a2.style.cursor = 'pointer';
                    a2.addEventListener('click', function (event) {
                        if (ul3.style.display === 'none') {
                            ul3.style.display = 'block';
                        } else {
                            ul3.style.display = 'none';
                        }
                    });
                    var ul3 = document.createElement('ul');
                    ul3.style.display = 'none';
                    data.photos.forEach(function (item3) {
                        if (item2.id === item3.albumId) {
                            var li3 = document.createElement('li');
                            var a3 = document.createElement('a');
                            a3.textContent = item3.thumbnailUrl;
                            a3.style.cursor = 'pointer';
                            a3.addEventListener('click', function (event) {
                                window.open(item3.thumbnailUrl);
                            });
                            li3.appendChild(a3);
                            ul3.appendChild(li3);
                        }
                    });
                    li2.appendChild(a2);
                    li2.appendChild(ul3)
                    ul2.appendChild(li2);
                }
            });
            li.appendChild(a);
            li.appendChild(ul2);
            ul.appendChild(li);
        });
        body.appendChild(ul);
    });
}

function getAllData(cb) {
    User.list(function (err, users) {
        if (err) {
            cb(err);
            return;
        }
        Album.list(function (err, albums) {
            if (err) {
                cb(err);
                return;
            }
            Photo.list(function (err, photos) {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, {users: users, albums: albums, photos: photos})
            })
        })

    });

}

render();





