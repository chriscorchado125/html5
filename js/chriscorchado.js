'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_BASE = 'https://chriscorchado.com/drupal8';
var pageLimit = 50;
$('#navigation').load('includes/nav.html');
$('#footer').load('includes/footer.html');
function setLoading(loadingStatus) {
    if (loadingStatus) {
        document.getElementById('preloader').style.display = 'block';
        $('.container').hide();
    }
    else {
        document.getElementById('preloader').style.display = 'none';
        $('.container').fadeIn(250);
    }
}
function getPage(page, search, pagingURL) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _a, passedInCount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = null;
                    setLoading(true);
                    if (search) {
                    }
                    if (!(page == 'contact')) return [3, 2];
                    return [4, fetch(API_BASE + "/contact/feedback")
                            .then(function (resp) {
                            return resp.ok ? resp.text() : Promise.reject(resp.statusText);
                        })
                            .then(function (page) {
                            data = page.substr(0, page.indexOf('</html>') + 8);
                            data = data.replace(/\/drupal8/g, API_BASE);
                            var form = data.substr(data.indexOf('<form'), data.indexOf('</form>'));
                            form = form.substr(0, form.indexOf('</form>') + 8);
                            form = form.replace('Your email address', 'Email');
                            var script = data.substr(data.indexOf('<script type="application/json" data-drupal-selector="drupal-settings-json">'), data.indexOf('></script>'));
                            script = script.substr(0, script.indexOf('</script>') + 9);
                            if (location.toString().indexOf('submitted') !== -1) {
                                data = '';
                            }
                            else {
                                data = "<h1>Contact</h1>" + form + " " + script;
                            }
                        })
                            .catch(function (error) {
                            alert("Sorry an error has occurred: " + error);
                        })];
                case 1:
                    _b.sent();
                    renderPage(data, page);
                    return [2, false];
                case 2:
                    if (!pagingURL) return [3, 4];
                    return [4, getData(pagingURL)];
                case 3:
                    data = _b.sent();
                    return [3, 22];
                case 4:
                    _a = page;
                    switch (_a) {
                        case 'about': return [3, 5];
                        case 'companies': return [3, 7];
                        case 'courses': return [3, 12];
                        case 'projects': return [3, 17];
                    }
                    return [3, 22];
                case 5: return [4, getData(API_BASE + "/jsonapi/node/page?fields[node--page]=id,title,body&filter[id][operator]=CONTAINS&filter[id][value]=ca23f416-ad70-41c2-9228-52ba6577abfe")];
                case 6:
                    data = _b.sent();
                    return [3, 22];
                case 7:
                    if (!search) return [3, 9];
                    return [4, getData(API_BASE + "/jsonapi/node/company?filter[or-group][group][conjunction]=OR&filter[field_company_name][operator]=CONTAINS&filter[field_company_name][value]=" + search + "&filter[field_company_name][condition][memberOf]=or-group&filter[field_job_title][operator]=CONTAINS&filter[field_job_title][value]=" + search + "&filter[field_job_title][condition][memberOf]=or-group&filter[body.value][operator]=CONTAINS&filter[body.value][value]=" + search + "&filter[body.value][condition][memberOf]=or-group&sort=-field_end_date&include=field_company_screenshot&page[limit]=" + pageLimit)];
                case 8:
                    data = _b.sent();
                    return [3, 11];
                case 9: return [4, getData(API_BASE + "/jsonapi/node/company?sort=-field_end_date&include=field_company_screenshot&page[limit]=" + pageLimit)];
                case 10:
                    data = _b.sent();
                    _b.label = 11;
                case 11: return [3, 22];
                case 12:
                    if (!search) return [3, 14];
                    return [4, getData(API_BASE + "/jsonapi/node/awards?filter[or-group][group][conjunction]=OR&filter[title][operator]=CONTAINS&filter[title][value]=" + search + "&filter[title][condition][memberOf]=or-group&filter[field_award_date][operator]=CONTAINS&filter[field_award_date][value]=" + search + "&filter[field_award_date][condition][memberOf]=or-group&sort=-field_award_date&include=field_award_pdf,field_track_image,field_award_images&page[limit]=" + pageLimit)];
                case 13:
                    data = _b.sent();
                    return [3, 16];
                case 14: return [4, getData(API_BASE + "/jsonapi/node/awards?sort=-field_award_date&include=field_award_pdf,field_track_image,field_award_images&page[limit]=" + pageLimit)];
                case 15:
                    data = _b.sent();
                    _b.label = 16;
                case 16: return [3, 22];
                case 17:
                    if (!search) return [3, 19];
                    return [4, getData(API_BASE + "/jsonapi/node/project?filter[or-group][group][conjunction]=OR&filter[title][operator]=CONTAINS&filter[title][value]=" + search + "&filter[title][condition][memberOf]=or-group&filter[taxonomy_term--tags][path]=field_project_technology.name&filter[taxonomy_term--tags][operator]=CONTAINS&filter[taxonomy_term--tags][value]=" + search + "&filter[taxonomy_term--tags][condition][memberOf]=or-group&filter[field_company.title][operator]=CONTAINS&filter[field_company.title][value]=" + search + "&filter[field_company.title][condition][memberOf]=or-group&filter[field_screenshot.meta.alt][operator]=CONTAINS&filter[field_screenshot.meta.alt][value]=" + search + "&filter[field_screenshot.meta.alt][condition][memberOf]=or-group&filter[field_date][operator]=CONTAINS&filter[field_date][value]=" + search + "&filter[field_date][condition][memberOf]=or-group&sort=-field_date&include=field_project_technology,field_company,field_screenshot&fields[node--company]=field_company_name,field_video_url&fields[node--project]=title,body,field_date,field_screenshot,field_project_technology,field_company,field_video_url&page[limit]=" + pageLimit)];
                case 18:
                    data = _b.sent();
                    return [3, 21];
                case 19: return [4, getData(API_BASE + "/jsonapi/node/project?sort=-field_date&include=field_project_technology,field_company,field_screenshot&fields[node--company]=field_company_name,field_video_url&fields[node--project]=title,body,field_date,field_screenshot,field_project_technology,field_company,field_video_url&page[limit]=" + pageLimit)];
                case 20:
                    data = _b.sent();
                    _b.label = 21;
                case 21: return [3, 22];
                case 22:
                    passedInCount = {
                        currentCount: document.getElementById('lastCount')
                            ? document.getElementById('lastCount').textContent
                            : 1,
                    };
                    data = __assign(__assign({}, data), { passedInCount: passedInCount });
                    if (data.data.length) {
                        renderPage(data, page, search, data.links.next, data.links.prev);
                    }
                    else {
                        updateInterface(search);
                    }
                    updateMenuPages(page, 'navbar-nav');
                    return [2];
            }
        });
    });
}
var updateInterface = function (search) {
    var action = 'none';
    if (!search) {
        action = '';
        document.getElementById('searchBtn').style.display = '';
    }
    var uiElements = ['preloader', 'searchCount', 'paging-info', 'pagination', 'msg'];
    uiElements.forEach(function (element) {
        if (document.getElementById(element)) {
            document.getElementById(element).style.display = action;
        }
    });
    if (!$('#noRecords').html() && search) {
        $('body').append("<div id=\"noRecords\" class=\"shadow\">No matches found for '" + search + "'</div>");
    }
};
var getData = function (dataURL) {
    var result = $.ajax({
        dataType: 'json',
        accepts: {
            json: 'application/vnd.api+json',
        },
        url: dataURL,
        type: 'GET',
    });
    return result;
};
var searchData = function () {
    var timeout = 0;
    var inputSearchBox = document.getElementById('searchSite');
    inputSearchBox.addEventListener('keyup', function (e) {
        if (!inputSearchBox.value) {
            updateInterface();
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            getPage(getCurrentPage(), inputSearchBox.value);
        }, 500);
    });
};
var searchClear = function () {
    var inputSearchBox = document.getElementById('searchSite');
    if (inputSearchBox.value !== '') {
        $('#noRecords').hide();
        inputSearchBox.value = '';
        getPage(getCurrentPage());
        updateInterface();
    }
};
var searchFilter = function (event) {
    var charCode = event.keyCode || event.which;
    return ((charCode >= 65 && charCode <= 122) ||
        (charCode >= 96 && charCode <= 105) ||
        (charCode >= 48 && charCode <= 57) ||
        charCode == 16 ||
        charCode == 32);
};
var itemWithSearchHighlight = function (itemToHighlight, searchedFor) {
    var dataToReturn = '';
    if (searchedFor) {
        var searchTerm_1 = new RegExp(searchedFor, 'gi');
        var results_1 = '';
        var searchString_1 = '';
        var searchStringArray = [];
        if (itemToHighlight && +itemToHighlight !== -1) {
            searchString_1 = itemToHighlight.replace('&amp;', '&').replace('&#039;', "'");
        }
        if (searchString_1.indexOf('<ul>') !== -1) {
            var listItem_1 = '';
            var searchWithHTML = searchString_1.replace('<ul>', '').replace('</ul>', '');
            searchStringArray = searchWithHTML.split('<li>');
            searchStringArray.forEach(function (element) {
                if (element.length > 3) {
                    searchString_1 = element.slice(0, element.lastIndexOf('<'));
                    if (searchString_1.match(searchTerm_1)) {
                        results_1 = searchString_1.replace(searchTerm_1, function (match) { return "<span class=\"highlightSearchText\">" + match + "</span>"; });
                        listItem_1 += "<li>" + results_1 + "</li>";
                    }
                    else {
                        listItem_1 += "<li>" + searchString_1 + "</li>";
                    }
                }
            });
            dataToReturn = "<ul>" + listItem_1 + "</ul>";
        }
        else {
            if (searchString_1.match(searchTerm_1)) {
                results_1 = searchString_1.replace(searchTerm_1, function (match) { return "<span class=\"highlightSearchText\">" + match + "</span>"; });
                dataToReturn += results_1;
            }
            else {
                dataToReturn += searchString_1;
            }
        }
    }
    return dataToReturn || itemToHighlight;
};
var seconds = 5;
var showCountDown = function () {
    seconds -= 1;
    document.getElementById('contact').style.padding = '50px';
    document.getElementById('contact').innerHTML = "\n    <h2>Thanks for the Feedback</h2>\n    <h4>You will be redirected to the homepage in " + seconds + " seconds.</h4><img id=\"timer\" src=\"https://chriscorchado.com/images/timer.gif\" />";
};
var getMonthYear = function (dateString) {
    var newDate = new Date(dateString);
    return (newDate.toLocaleString('default', { month: 'long' }) +
        ' ' +
        newDate.getFullYear().toString());
};
var renderPage = function (data, page, searchedFor, next, prev) {
    if (document.getElementById('noRecords')) {
        document.getElementById('noRecords').style.display = 'none';
    }
    if (page == 'about') {
        document.getElementById('search-container').style.display = 'none';
        document.getElementById('profiles').style.display = 'block';
        document.getElementById('logo').getElementsByTagName('img')[0].style.border =
            '1px dashed #7399EA';
    }
    if (page == 'contact') {
        $('.container').html(data.toString());
        setLoading(false);
        var loc_1 = location.toString().indexOf('contact.html?submitted');
        if (loc_1 !== -1) {
            setInterval(showCountDown, 1000);
            setTimeout(function () {
                window.location.replace(location.toString().substr(0, loc_1));
            }, seconds * 1000);
        }
        else {
            $('#contact-link').addClass('nav-item-active');
            var webLocation = document.getElementById('edit-field-site-0-value');
            webLocation.value = location.toString();
            $('#edit-name').focus();
        }
        return false;
    }
    var screenshotCount = 0, imgAltCount = 0, itemCount = 0;
    var imgPieces = [''];
    var item = '', itemBody = '', currentNavItem = '', itemGridClass = '', itemTitle = '', itemDate = '', startDate = '', endDate = '', itemJobTitle = '', itemTechnology = '', itemTechnologyIcon = '', itemCompanyName = '', itemWorkType = '', itemPDF = '', itemTrackImage = '', section = '', projectImage = '';
    var pageIsSearchable = false;
    var includedAssetFilename = [''];
    var includedCompanyName = [''];
    var includedTechnologyName = [''];
    var includedTechnologyIcon = [''];
    var includedTechnologyItem = [];
    if (data.included) {
        data.included.forEach(function (included_element) {
            if (included_element.attributes.description) {
                var iconFileNamePath = /"(.*?)"/.exec(included_element.attributes.description.value);
                includedTechnologyIcon[included_element.id] = iconFileNamePath[1];
            }
            if (included_element.attributes.filename) {
                includedAssetFilename[included_element.id] = included_element.attributes.filename;
            }
            if (included_element.attributes.field_company_name) {
                includedCompanyName[included_element.id] =
                    included_element.attributes.field_company_name;
            }
            if (included_element.attributes.name) {
                includedTechnologyName[included_element.id] = included_element.attributes.name;
            }
        });
    }
    data.data.forEach(function (element) {
        itemTitle = element.attributes.title;
        itemBody = element.attributes.body ? element.attributes.body.value : '';
        itemDate = element.attributes.field_date || element.attributes.field_award_date;
        itemJobTitle = element.attributes.field_job_title;
        startDate = element.attributes.field_start_date;
        endDate = element.attributes.field_end_date;
        itemWorkType = element.attributes.field_type == 'full' ? 'Full-Time' : 'Contract';
        itemTechnology = '';
        itemTrackImage = '';
        imgPieces = [];
        includedTechnologyItem = [];
        if (element.relationships) {
            if (element.relationships.field_award_images &&
                element.relationships.field_award_images.data) {
                imgPieces.push(includedAssetFilename[element.relationships.field_award_images.data[0].id]);
            }
            if (element.relationships.field_award_pdf &&
                element.relationships.field_award_pdf.data) {
                itemPDF = includedAssetFilename[element.relationships.field_award_pdf.data.id];
            }
            if (element.relationships.field_track_image &&
                element.relationships.field_track_image.data) {
                itemTrackImage =
                    includedAssetFilename[element.relationships.field_track_image.data.id];
            }
            if (element.relationships.field_company &&
                element.relationships.field_company.data) {
                itemCompanyName =
                    includedCompanyName[element.relationships.field_company.data.id];
            }
            if (element.relationships.field_company_screenshot &&
                element.relationships.field_company_screenshot.data) {
                imgPieces.push(includedAssetFilename[element.relationships.field_company_screenshot.data[0].id]);
            }
            if (element.relationships.field_screenshot &&
                element.relationships.field_screenshot.data) {
                for (var i = 0; i < element.relationships.field_screenshot.data.length; i++) {
                    imgPieces.push(includedAssetFilename[element.relationships.field_screenshot.data[i].id]);
                }
            }
            if (element.relationships.field_project_technology &&
                element.relationships.field_project_technology.data) {
                for (var i = 0; i < element.relationships.field_project_technology.data.length; i++) {
                    itemTechnology +=
                        includedTechnologyName[element.relationships.field_project_technology.data[i].id] + ', ';
                    itemTechnologyIcon +=
                        includedTechnologyIcon[element.relationships.field_project_technology.data[i].id] + ', ';
                    var technologyItem = {
                        name: includedTechnologyName[element.relationships.field_project_technology.data[i].id],
                        image: includedTechnologyIcon[element.relationships.field_project_technology.data[i].id],
                    };
                    includedTechnologyItem.push(technologyItem);
                }
            }
        }
        if (itemDate) {
            if (page == 'projects') {
                itemDate = itemDate.split('-')[0];
            }
            if (page == 'courses') {
                itemDate = getMonthYear(itemDate);
            }
        }
        if (startDate) {
            startDate = getMonthYear(startDate);
        }
        if (endDate) {
            endDate = getMonthYear(endDate);
        }
        itemTitle = itemTitle.replace('&amp;', '&');
        if (searchedFor) {
            itemTitle = itemWithSearchHighlight(itemTitle, searchedFor);
            itemDate = itemWithSearchHighlight(itemDate, searchedFor);
            startDate = itemWithSearchHighlight(startDate, searchedFor);
            endDate = itemWithSearchHighlight(endDate, searchedFor);
            itemBody = itemWithSearchHighlight(itemBody, searchedFor);
            itemJobTitle = itemWithSearchHighlight(itemJobTitle, searchedFor);
            itemTechnology = itemWithSearchHighlight(itemTechnology, searchedFor);
            itemCompanyName = itemWithSearchHighlight(itemCompanyName, searchedFor);
            if (itemWorkType !== 'node-company') {
                itemWorkType = itemWithSearchHighlight(itemWorkType, searchedFor);
            }
        }
        itemCount++;
        switch (page) {
            case 'about':
                currentNavItem = 'about-link';
                var aboutData = element.attributes.body.value.toString().split('<hr />');
                item = "<h1>" + itemTitle + "</h1> " + aboutData[0];
                document.getElementById('profiles').innerHTML = aboutData[1];
                break;
            case 'companies':
                currentNavItem = 'companies-link';
                pageIsSearchable = true;
                item += "<div class=\"company-container col shadow\">\n\n          <div class=\"company-name\">" + itemTitle + "</div>\n          <div class=\"company-job-title\">" + itemJobTitle + "</div>\n          <div class=\"body-container\">" + itemBody + "</div>\n\n          <div class=\"screenshot-container\">\n            <img src=" + getFullUrlByPage(imgPieces[0], page) + " \n            class=\"company-screenshot\" \n            alt=\"" + element.attributes.title + " Screenshot\" \n            title=\"" + element.attributes.title + " Screenshot\"/>\n          </div>\n\n          <div class=\"employment-dates\">" + startDate + " - " + endDate + "</div>\n        </div>";
                break;
            case 'courses':
                currentNavItem = 'courses-link';
                pageIsSearchable = true;
                item += "<div class=\"course-box box\">\n          <h2>" + itemTitle + "</h2>\n\n          <div>\n            <img src=\"" + getFullUrlByPage(imgPieces[0], page) + "\" \n              alt=\"" + itemTitle.replace(/(<([^>]+)>)/gi, '') + "\" \n              title=\"" + itemTitle.replace(/(<([^>]+)>)/gi, '') + "\" />\n          </div>\n\n          <div class=\"course-wrapper\">\n\n            <span class=\"course-date\">" + itemDate + "</span>\n\n            <span class=\"course-links\">\n              <a href=\"" + getFullUrlByPage(itemPDF, page) + "\" target=\"_blank\">\n                <img src=\"https://chriscorchado.com/images/pdfIcon.jpg\" height=\"25\" \n                title=\"View the PDF Certificate\" alt=\"View the PDF Certificate\"/>\n              </a>\n            </span>";
                if (itemTrackImage) {
                    item += "<span class=\"course-links\">\n              <a href=\"" + getFullUrlByPage(itemTrackImage, page) + "\" data-featherlight=\"image\">\n                <img src=\"https://chriscorchado.com/images/linkedIn-track.png\" height=\"25\" \n                title=\"View the Courses in the Track\" alt=\"View the Courses in the Track\" />\n              </a>\n            </span>";
                }
                item += "</div></div>";
                break;
            case 'projects':
                currentNavItem = 'projects-link';
                pageIsSearchable = true;
                item += "<div class=\"project col\">\n        <div class=\"project-title\">" + itemTitle + "</div>\n        <div class=\"project-company\">" + itemCompanyName + " <span class=\"project-date\">(" + itemDate + ")</span></div> \n        <div class=\"body-container\">" + itemBody + "</div>";
                if (imgPieces) {
                    screenshotCount = +imgPieces.length;
                    itemGridClass = "project-item-grid project-items" + screenshotCount;
                    section = "<section data-featherlight-gallery data-featherlight-filter=\"a\" class=\"" + itemGridClass + "\">";
                    var screenshotAlt_1 = new Array();
                    element.relationships.field_screenshot.data.forEach(function (screenshot) {
                        screenshotAlt_1.push(screenshot.meta.alt);
                    });
                    imgAltCount = 0;
                    imgPieces.forEach(function (img) {
                        projectImage = getFullUrlByPage(img, page);
                        section += "<div class=\"project-item shadow\">\n            \n              <a href=" + projectImage + " class=\"gallery\">\n                <div class=\"project-item-desc\">" + itemWithSearchHighlight(screenshotAlt_1[imgAltCount], searchedFor) + "</div>\n                <img src=" + projectImage + " alt=" + screenshotAlt_1[imgAltCount] + " \n                  title=" + screenshotAlt_1[imgAltCount] + " />\n              </a>\n            </div>";
                        imgAltCount++;
                    });
                    section += "</section>";
                    item += section;
                }
                if (element.attributes.field_video_url) {
                    element.attributes.field_video_url.forEach(function (img) {
                        item += "<a href=\"" + img + "\" \n          data-featherlight=\"iframe\" \n          data-featherlight-iframe-frameborder=\"0\" \n          data-featherlight-iframe-allowfullscreen=\"true\" \n          data-featherlight-iframe-allow=\"autoplay; encrypted-media\"\n          data-featherlight-iframe-style=\"display:block;border:none;height:85vh;width:85vw;\" class=\"play-video\">\n            Play Video <img src=\"images/play_vidoe_icon.png\" title=\"Play Video\" alt=\"Play Video\" width=\"20\" />\n          </a>";
                    });
                }
                item += "<div class=\"project-technology\">" + itemTechnology.slice(0, -2) + "</div>\n        </div>";
                setPageMessage('click an image to enlarge it');
                break;
        }
    });
    $('#' + currentNavItem).addClass('nav-item-active');
    if (itemCount > 0) {
        $('.container').html(item);
        if (pageIsSearchable) {
            document.getElementById('search-container').style.display = 'block';
        }
        $('a.gallery').featherlightGallery({
            previousIcon: '&#9664;',
            nextIcon: '&#9654;',
            galleryFadeIn: 200,
            galleryFadeOut: 300,
        });
    }
    setItemCount(itemCount, data.passedInCount.currentCount, prev, next);
    setLoading(false);
};
var getFullUrlByPage = function (linkToFix, page) {
    var pathToResource = 'No Path Found';
    switch (page) {
        case 'companies':
            pathToResource = 'company-screenshot';
            break;
        case 'courses':
            if (linkToFix.indexOf('.pdf') !== -1) {
                pathToResource = 'award-pdf';
            }
            else {
                pathToResource = 'award-images';
            }
            break;
        case 'projects':
            pathToResource = 'project-screenshot';
            break;
    }
    return API_BASE + "/sites/default/files/" + pathToResource + "/" + linkToFix;
};
var setItemCount = function (count, paginationTotal, prev, next) {
    var dataOffset = 0;
    var dataOffsetText = '';
    var prevLink = '';
    var nextLink = '';
    if (next) {
        var nextURL = next.href
            .replace(/%2C/g, ',')
            .replace(/%5B/g, '[')
            .replace(/%5D/g, ']');
        dataOffset = nextURL.substring(nextURL.search('offset') + 8, nextURL.search('limit') - 6);
    }
    if ($('#searchSite').val()) {
        dataOffsetText = count + " " + (count == 1 ? 'Item' : 'Items') + " ";
        if (count <= pageLimit) {
            $('#searchCount').html(count + ("  " + (count == 1 ? 'Item' : 'Items')));
        }
        else {
            $('#searchCount').html(pageLimit + ("  " + (+pageLimit == 1 ? 'Item' : 'Items')));
        }
    }
    if (!next && !prev) {
        document.getElementById('searchCount').innerHTML = "<span id=\"totalItems\">" + count + "</span>\n   " + (count == 1 ? 'Item' : 'Items');
    }
    else {
        var currentCount = +dataOffset / pageLimit;
        if (count == dataOffset) {
            dataOffsetText = "Items 1-<span id=\"lastCount\">" + pageLimit + "</span>";
        }
        else {
            if (currentCount !== 0) {
                dataOffsetText = "Items " + (currentCount * pageLimit - pageLimit) + "-<span id=\"lastCount\">" + currentCount * pageLimit + "</span>";
            }
            else {
                dataOffsetText = "Items " + paginationTotal + "-<span id=\"lastCount\">" + (+paginationTotal + count) + "</span>";
            }
        }
        document.getElementById('searchCount').innerHTML = "<span id=\"paging-info\">" + dataOffsetText + "</span>";
        prevLink = prev
            ? "<a href=\"#\" class=\"pager-navigation\" title=\"View the previous page\" onclick=\"getPage(getCurrentPage(), document.getElementById('searchSite').value,'" + prev.href + "')\">Prev</a>"
            : "<span class=\"pager-navigation disabled\" title=\"There is no previous page available\">Prev</span>";
        nextLink = next
            ? "<a href=\"#\" class=\"pager-navigation\" title=\"View the next page\" onclick=\"getPage(getCurrentPage(), document.getElementById('searchSite').value,'" + next.href + "')\">Next</a>"
            : "<span class=\"pager-navigation disabled\" title=\"There is no next page available\">Next</span>";
    }
    if (count < pageLimit && paginationTotal === 1) {
        $('#pagination').hide();
    }
    else {
        $('#pagination').html(prevLink + "  " + nextLink);
    }
};
var setPageMessage = function (msg) {
    document.getElementById('msg').innerHTML = "(" + msg + ")";
    document.getElementById('msg').style.display = 'block';
    setTimeout(function () {
        $('#msg').fadeOut(3000);
    }, 2500);
};
function updateMenuPages(currentPage, targetContainer) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(API_BASE + "/api/menu_items/main?_format=json")
                        .then(function (resp) {
                        return resp.ok ? resp.json() : Promise.reject(resp.statusText);
                    })
                        .then(function (pageData) {
                        var pageName = '';
                        var pageLink = '';
                        var homepageStyle = '';
                        if (currentPage == 'about') {
                            homepageStyle = 'border: 1px dashed rgb(115, 153, 234);';
                        }
                        var generatedPageLinks = "<a href=\"index.html\" class=\"navbar-brand\" id=\"logo\" style=\"" + homepageStyle + "\">\n        <img src=\"./images/chriscorchado-initials-logo.png\" title=\"Home\" alt=\"Home\">\n      </a>";
                        for (var page in pageData) {
                            pageName = pageData[page].title;
                            if (pageName == 'Home' || pageName == 'About' || !pageData[page].enabled) {
                                continue;
                            }
                            var activeNavItem = '';
                            if (currentPage == pageName.toLowerCase()) {
                                activeNavItem = 'nav-item-active';
                            }
                            pageLink = pageName;
                            if (pageName == 'Companies')
                                pageName = 'History';
                            generatedPageLinks += "<a href=\"" + pageLink.toLowerCase() + ".html\" \n        class=\"nav-item nav-link " + activeNavItem + "\" \n        title=\"" + pageName + "\" \n        id=\"" + pageName.toLowerCase() + "-link\">" + pageName + "</a>";
                        }
                        document.getElementById(targetContainer).innerHTML = generatedPageLinks;
                    })
                        .catch(function (error) {
                        alert("Sorry an error has occurred: " + error);
                    })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
var getCurrentPage = function () {
    var getCurrentPage = window.location.pathname
        .split('/')
        .filter(function (pathnamePieces) {
        return pathnamePieces.length;
    })
        .pop();
    var pageName = getCurrentPage.split('.')[0];
    if (pageName == 'index' || pageName == 'html5')
        pageName = 'about';
    return pageName;
};
window.onload = function () {
    getPage(getCurrentPage());
};
//# sourceMappingURL=chriscorchado.js.map