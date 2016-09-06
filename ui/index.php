<?php
    require_once("../server/main.php");

    $project = "App";
    $authenticator = new Authenticator($project);

    $userObj = $authenticator->validateSession();
    if (!$userObj) {
        $authenticator->invalidateSession();
        util_redirectToURL($authenticator->getAuthURL());
    }
?>
<!doctype html>
    <head profile="http://www.w3.org/2005/10/profile">
        <link rel="icon" type="image/png" href="favicon.png" />
        <meta charset="utf-8">
        <!-- Use the .htaccess and remove these lines to avoid edge case issues.
           More info: h5bp.com/i/378 -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Kenseo</title>
        <!-- <meta name="description" content="Backbone.js and Require.js Boilerplate Library"> -->
        <!-- Mobile viewport optimized: h5bp.com/viewport -->
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width">
        <link href="assets/styles/css/normalize.css" type="text/css" rel="stylesheet" />
        <link href="assets/styles/css/chosen.css" type="text/css" rel="stylesheet" />
        <link href="assets/styles/css/main.css" type="text/css" rel="stylesheet" />
        <!-- <link href="assets/styles/css/viewer.css" type="text/css" rel="stylesheet" /> -->

        <link rel="resource" type="application/l10n" href="locale/locale.properties"/>
		<link href="assets/styles/css/zebra-default.css" type="text/css" rel="stylesheet"/>
        <link href="assets/styles/css/daterangepicker.css" type="text/css" rel="stylesheet"/>
    </head>
    <body>
        <div class="splash-screen-container">
            <div class="splash-container">
                <svg id="kenseoProgress" width="79.36px" height="93.844px" viewBox="0 0 79.36 93.844">
                    <defs>
                        <mask id="bubbleKenseo">
                           <path fill="#ffffff" stroke="#314176" stroke-width="1" stroke-miterlimit="10" d="M50.771,2.114C30.024-4.013,8.239,7.839,2.113,28.587
                	c-6.125,20.747,5.725,42.536,26.474,48.661h0.002l-4.604,15.578l33.845-18.444c0.389-0.203,0.777-0.412,1.159-0.63l0.283-0.155
                	l-0.013-0.005c8.396-4.844,15.024-12.786,17.986-22.819C83.373,30.026,71.521,8.24,50.771,2.114z"/>
                        </mask>
                    </defs>
                    <g x="0" y="0" width="79.36px" height="93.844px" mask="url(#bubbleKenseo)" height="100">
                        <rect id="progressMove" x="0" y="100%" width="100%" height="100%" fill="#304075" stroke="transparent"/>
                    </g>
                </svg>
                <style>
                    #progressMove{
                        transition: .3s y;
                    }
                </style>
            </div>
        </div>
        <div class="popup-container" style="display: none;"></div>
        <div class="page">
            <div class="page-wrapper">
                <div class="header">
                    <div class="hamburger html-click hamburger-menu" data-html-class="active" data-html-target=".hamburger-menu">
                        <div class="hamburger-icon">
                            <svg><use xlink:href="#hamburger"></use></svg>
                            <div class="hamburger-notify">4</div>
                        </div>
                    </div>
                    <div class="menu hamburger-menu"></div>
                    <a href="#" class="logo" data-url="summary">
                        <svg><use xlink:href="#logo"></use></svg>
                        <div class="timer-overlay hide"></div>
                    </a>
                    <div class="create-icon-holder html-click sub-menu-nav" data-html-class="active">
                        <div class="create-plus-icon"><svg><use xlink:href="#add"></use></svg></div>
                        <div class="sub-menu-holder bottom-nav right-nav">
                            <div class="sub-menu-item popup-click" data-url="add-project">Add a Project</div>
                            <a class="sub-menu-item" href="#persona/1">Create a Persona</a>
                            <div class="popup-click sub-menu-item" data-url="add-artefact">Add an Artefact</div>
                            <div class="popup-click sub-menu-item" data-url="share-artefact">Share an Artefact</div>
                            <div class="popup-click sub-menu-item" data-url="create-meeting">Create a Meeting</div>
                        </div>
                    </div>
                    <div class="search-icon"><svg><use xlink:href="#search"></use></svg></div>
                    <div id="user-profile-id" class="profile-pic-holder html-click sub-menu-nav" data-html-class="active">

                    </div>
                </div>
                <div class="content">
                    <div class="content-wrapper">
                		<div class="project-section" style="display: none"></div>
            			<div class="dashboard-section" style="display: none"></div>
            			<div class="meeting-notes-section" style="display: none"></div>
                	</div>
                </div>
                <div class="documentView" style="display: none">
                	<div class="document-wrapper">
						<div class="pdfs-container">

						</div>

						<div class="dv-info"></div>
						<div class="dv-status-bar">
							<div class="dv-tab-panel-section">
							</div>
							<div class="dv-tb-people-section"></div>
						</div>
					</div>
                </div>
                <div class="projects-page-section">
                    <div class="projects-page" style="display: none">
                        <div class="project-heading">
                            <div class="projects-heading-icon">
                                <svg><use xlink:href="#projects"></use></svg>
                            </div>
                            <a class="heading-text-project">Projects</a>
                        </div>
                        <div class="projects-state">Active projects</div>
                        <div class="active-projects-page-wrapper"></div>
                        <div class="projects-state">Archived projects</div>
                        <div class="archived-projects-page-wrapper"></div>
                    </div>
                </div>
                <div class="persona-page-section">
                </div>
            </div>
        </div>
        <script src="js/app/sandbox/sandbox.load.js"></script>
    </body>
</html>
