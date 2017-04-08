"use strict"

// register the application module
b4w.register("cube_sedimentation_app", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");

// detect application mode
var DEBUG = (m_ver.type() == "RELEASE");

// automatically detect assets path
var APP_ASSETS_PATH = m_cfg.get_assets_path("cube_sedimentation");

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: false,
        console_verbose: DEBUG,
        autoresize: true
    });
}

/**
 * callback executed when the app is initialized 
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load(APP_ASSETS_PATH + "read_data_surfaces_hires_rigid_blend4web.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

/**
 * callback executed when the scene data is loaded
 */
    function load_cb(data_id, success) {

	$("#info_button").fadeOut();

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();

	// place your code here

	$("#help_container").show()
	$("#help_button").show()
	$("#info_button").show()
	
	if($(window).width()>644 && $(window).height()>576)
	    $("#info_container").show();

    info_button.onclick = function() {
	info_container=document.getElementById('info_container')
	if(info_container.style.display!='block'){
	    $("#info_container").fadeIn()
	}
	else
	{
	    $("#info_container").fadeOut()
	}
    };
    help_button.onclick = function() {
	help_container=document.getElementById('help_container')
	if(help_container.style.display!='block'){
	    $("#help_container").fadeIn()
	}
	else
	{
	    $("#help_container").fadeOut()
	}
    };
}


});

// import the app module and start the app by calling the init method
b4w.require("cube_sedimentation_app").init();
