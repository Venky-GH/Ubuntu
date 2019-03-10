let url = "http://localhost:9090/Desktop";
let arr = {dir_name: 'Desktop'};
let fname = "";
let elm = "";

$(function () {
    listDir();
});

function listDir() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: "/listDirectory",
        cache: false,
        data: JSON.stringify(arr),
        success: function (response) {
            $("#main").empty();
            for (key in response) {
                let filename = response[key].name;
                if (response[key].type == "file") {
                    let elem = $(".file.hidden").clone();
                    elem.removeClass("hidden");
                    elem.find("p").html(filename);
                    elem.attr("ondblclick", "updateURL('" + filename.toString() + "')");
                    elem.contextmenu(function (e) {
                        right_click_on_f(e, filename, elem);
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    });
                    $("#main").append(elem);
                    $("#main").append("<br>");
                } else {
                    let elem = $(".folder.hidden").clone();
                    elem.removeClass("hidden");
                    elem.find("p").html(filename);
                    elem.attr("ondblclick", "updateURL('" + filename.toString() + "')");
                    elem.contextmenu(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        right_click_on_f(e, filename, elem);
                    });
                    $("#main").append(elem);
                    $("#main").append("<br>");
                }
            }
            window.history.pushState({}, null, url);
        },
        error: function (err) {
            alert("no!");
            console.log(err);
        }
    });
}

function updateURL(fname) {
    if (fname.includes(".")) {
        alert("This is a File!");
    } else {
        if(url == "http://localhost:9090/")
            url += fname;
        else
            url += '/' + fname;
        arr["dir_name"] += '/' + fname;
        listDir();
        window.history.pushState({}, null, url);
    }
}

$(window).on('popstate', function () {
    if (url != window.location.href) {
        window.history.pushState({}, null, window.location.href);
        url = window.location.href;
        arr["dir_name"] = url.split("http://localhost:9090/")[1];
        listDir();
    }
});

function create(param) {
    let obj = {};
    let name = "";
    if (param == "folder") {
        name = $("#foldername").val();
        obj = {
            "path": arr["dir_name"] + '/' + $("#foldername").val(),
            "name": name
        };
    } else {
        name = $("#filename").val();
        obj = {
            "path": arr["dir_name"] + '/' + $("#filename").val(),
            "name": name
        };
    }
    $.ajax({
        type: 'POST',
        dataType: "text",
        contentType: "application/json",
        url: "/create",
        cache: false,
        data: JSON.stringify(obj),
        success: function (response) {
            console.log(response);
            listDir();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

$("#createDirForm").submit(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $("#createFolder").modal('toggle');
    create("folder");
});

$("#createFileForm").submit(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $("#createFile").modal('toggle');
    create("file");
});

$("#renameFForm").submit(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $("#renameF").modal('toggle');
    rename($("#newname").val());
});

function right_click_on_f(e, filename, elem) {
    fname = filename;
    elm = elem;
    let menu = document.getElementById("rightclick_f");
    let menu_style = menu.style;
    menu_style.top = e.clientY + "px";
    menu_style.left = e.clientX + "px";
    menu_style.visibility = "visible";
    menu_style.opacity = "1";
    $(document).on("click", function () {
        menu_style.opacity = "0";
        setTimeout(function () {
            menu_style.visibility = "hidden";
        }, 501);
    });
}

function rename(newname) {
    let currentPath = arr["dir_name"] + '/' + fname;
    let newPath = arr["dir_name"] + '/' + newname;
    let obj = {
        "currentPath": currentPath,
        "newPath": newPath,
        "currentName": fname,
        "newName": newname
    }
    $.ajax({
        type: 'POST',
        dataType: "text",
        contentType: "application/json",
        url: "/rename",
        cache: false,
        data: JSON.stringify(obj),
        success: function (response) {
            console.log(response);
            listDir();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function moveToTrash() {
    let currentPath = arr["dir_name"] + '/' + fname;
    obj = {
        "currentPath": currentPath,
        "fname": fname
    }
    $.ajax({
        type: 'POST',
        dataType: "text",
        contentType: "application/json",
        url: "/moveToTrash",
        cache: false,
        data: JSON.stringify(obj),
        success: function (response) {
            console.log(response);
            listDir();
        },
        error: function (err) {
            console.log(err);
        }
    });
}