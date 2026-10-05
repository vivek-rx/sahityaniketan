export type AdminLang = "mr" | "en";

export interface AdminTranslations {
  // Navigation & Topbar
  adminTitle: string;
  adminSubtitle: string;
  adminBadge: string;
  viewWebsite: string;
  signOut: string;
  menuOpen: string;
  cmsPortal: string;
  navDashboard: string;
  navDashboardSub: string;
  navNotices: string;
  navNoticesSub: string;
  navGallery: string;
  navGallerySub: string;
  navCarousel: string;
  navCarouselSub: string;
  navCatalogue: string;
  navCatalogueSub: string;
  switchLang: string;

  // Dashboard Page
  dashHeadline: string;
  dashSubheadline: string;
  todayLabel: string;
  announcementTitle: string;
  announcementSubtitle: string;
  statusActive: string;
  statusInactive: string;
  toggleHide: string;
  toggleShow: string;
  currentMessageLabel: string;
  announcementPlaceholder: string;
  saveChanges: string;
  savingChanges: string;
  saveSuccess: string;
  openAllNotices: string;

  // Bulk Upload Highlight Card
  bulkCardBadge: string;
  bulkCardTitle: string;
  bulkCardDesc: string;
  bulkCardBtn: string;

  // CMS Modules Grid
  cmsModulesTitle: string;
  refreshBtn: string;
  carouselTitle: string;
  carouselDesc: string;
  carouselBtn: string;
  carouselCountLabel: string;
  galleryTitle: string;
  galleryDesc: string;
  galleryBtn: string;
  galleryCountLabel: string;
  catalogueTitle: string;
  catalogueDesc: string;
  catalogueBtn: string;
  catalogueCountLabel: string;

  // Public Links
  quickLinksTitle: string;
  linkHome: string;
  linkCatalogue: string;
  linkEvents: string;
  linkGallery: string;
  linkMembership: string;

  // Gallery Management Page
  galleryPageTitle: string;
  galleryPageSubtitle: string;
  galleryBulkBtn: string;
  galleryNewAlbumBtn: string;
  tabActiveAlbums: string;
  tabArchivedAlbums: string;
  loadingAlbums: string;
  noAlbumsFound: string;
  noAlbumsHint: string;
  featuredBadge: string;
  itemsLabel: string;
  btnEdit: string;
  btnManageMedia: string;
  btnDelete: string;

  // Bulk Upload Modal
  bulkModalTitle: string;
  bulkSelectAlbumLabel: string;
  bulkSelectFilesLabel: string;
  bulkDragDropText: string;
  bulkDragDropHint: string;
  bulkSelectedCount: string;
  bulkClearAll: string;
  bulkPasteUrlsLabel: string;
  bulkUploadBtn: string;
  bulkUploadingBtn: string;
  bulkProgressLabel: string;
  bulkSuccessMsg: string;
  cancelBtn: string;

  // Album Modal
  albumModalNewTitle: string;
  albumModalEditTitle: string;
  albumTitleLabel: string;
  albumTitlePlaceholder: string;
  albumCategoryLabel: string;
  albumCoverLabel: string;
  albumCoverPlaceholder: string;
  albumFeaturedLabel: string;
  albumSaveBtn: string;
  albumCreateBtn: string;

  // Media Modal
  mediaModalTitle: string;
  mediaQuickBulkPrompt: string;
  mediaQuickBulkHint: string;
  mediaQuickBulkBtn: string;
  mediaAddSingleTitle: string;
  mediaTypeLabel: string;
  mediaTypePhoto: string;
  mediaTypeVideo: string;
  mediaUrlLabel: string;
  mediaAddBtn: string;
  mediaItemsListTitle: string;
  mediaSelectAll: string;
  mediaDeselectAll: string;
  mediaDeleteSelected: string;
  mediaEmptyNotice: string;

  // Carousel Page
  carouselPageTitle: string;
  carouselPageSubtitle: string;
  carouselAddBtn: string;
  carouselNoSlides: string;
  carouselSlideOrder: string;
  carouselActiveBadge: string;
  carouselInactiveBadge: string;
  carouselModalNewTitle: string;
  carouselModalEditTitle: string;
  carouselHeadingLabel: string;
  carouselHeadingPlaceholder: string;
  carouselSubtitleLabel: string;
  carouselSubtitlePlaceholder: string;
  carouselButtonTextLabel: string;
  carouselButtonUrlLabel: string;
  carouselImageLabel: string;
  carouselActiveCheckLabel: string;
  carouselSaveBtn: string;

  // Noticeboard Page
  noticePageTitle: string;
  noticePageSubtitle: string;
  noticeAddBtn: string;
  noticeListTitle: string;
  noticeNoNotices: string;
  noticeModalNewTitle: string;
  noticeModalEditTitle: string;
  noticeTitleLabel: string;
  noticeTitlePlaceholder: string;
  noticeContentLabel: string;
  noticeContentPlaceholder: string;
  noticePriorityLabel: string;
  noticePriorityUrgent: string;
  noticePriorityHigh: string;
  noticePriorityNormal: string;
  noticePriorityLow: string;
  noticeActiveCheckLabel: string;
  noticeSaveBtn: string;

  // Categories
  catEvents: string;
  catLibrary: string;
  catHeritage: string;
  catGeneral: string;
}

export const ADMIN_TRANSLATIONS: Record<AdminLang, AdminTranslations> = {
  mr: {
    // Topbar
    adminTitle: "साहित्य निकेतन",
    adminSubtitle: "प्रशासक नियंत्रण कक्ष • ग्रंथालय व्यवस्थापन",
    adminBadge: "प्रशासक (Admin)",
    viewWebsite: "वेबसाइट पाहा",
    signOut: "लॉगआउट (Sign Out)",
    menuOpen: "मेनू उघडा",
    cmsPortal: "ग्रंथालय CMS व्यवस्थापन",
    navDashboard: "डॅशबोर्ड",
    navDashboardSub: "Dashboard",
    navNotices: "दैनिक सूचना व फलक",
    navNoticesSub: "Notices & Banner",
    navGallery: "छायाचित्रे व बल्क अपलोड",
    navGallerySub: "Gallery & Bulk Upload",
    navCarousel: "फिरते बॅनर",
    navCarouselSub: "Carousel Slides",
    navCatalogue: "ग्रंथसूची",
    navCatalogueSub: "Book Catalogue",
    switchLang: "English मध्ये बदला",

    // Dashboard
    dashHeadline: "प्रशासक नियंत्रण कक्ष",
    dashSubheadline: "साहित्य निकेतन ग्रंथालय, अंबाजोगाई • अधिकृत CMS व्यवस्थापन",
    todayLabel: "आजची तारीख",
    announcementTitle: "दैनिक सूचना फलक (Website Announcement)",
    announcementSubtitle: "मुख्य संकेतस्थळाच्या शीर्षस्थानी (Top Banner) दिसणारा थेट संदेश येथे बदला.",
    statusActive: "वेबसाइटवर सुरू आहे",
    statusInactive: "वेबसाइटवरून लपवले आहे",
    toggleHide: "लपवा",
    toggleShow: "सुरू करा",
    currentMessageLabel: "सध्याचा सूचना संदेश:",
    announcementPlaceholder: "उदा. साहित्य निकेतन ग्रंथालय सर्व वाचकांसाठी नियमित वेळेत सुरू आहे.",
    saveChanges: "बदल जतन करा (Save Notice)",
    savingChanges: "जतन होत आहे...",
    saveSuccess: "बदल यशस्वीरीत्या वेबसाइटवर प्रसिद्ध झाले!",
    openAllNotices: "सर्व परिपत्रके व नोटीस फलक उघडा",

    // Bulk Card
    bulkCardBadge: "नवीन वैशिष्ट्य",
    bulkCardTitle: "छायाचित्रे बल्क अपलोड करा (Bulk Picture Upload)",
    bulkCardDesc: "साहित्यिक कार्यक्रम, व्याख्याने किंवा ग्रंथालय सोहळ्याचे अनेक छायाचित्रे एकाच वेळी निवडून अल्बममध्ये अपलोड करा.",
    bulkCardBtn: "बल्क अपलोड उघडा →",

    // Modules
    cmsModulesTitle: "वेबसाइट CMS व्यवस्थापन दालने",
    refreshBtn: "रिफ्रेश",
    carouselTitle: "मुख्य पृष्ठ फिरते बॅनर",
    carouselDesc: "होमपेजवरील मोठे छायाचित्र बॅनर, मुख्य मथळा व दुवे व्यवस्थापित करा.",
    carouselBtn: "स्लाइड्स बदला व जोडा",
    carouselCountLabel: "स्लाइड्स",
    galleryTitle: "छायाचित्र दालन (Gallery)",
    galleryDesc: "कार्यक्रमांचे अल्बम तयार करा व फोटो बल्क स्वरूपात अपलोड करा.",
    galleryBtn: "अल्बम व फोटो व्यवस्थापित करा",
    galleryCountLabel: "अल्बम",
    catalogueTitle: "ग्रंथसूची व संग्रह (Catalogue)",
    catalogueDesc: "वाचकांसाठी उपलब्ध ३९,०००+ मुद्रित ग्रंथ, कादंबऱ्या व दुर्मीळ संदर्भ.",
    catalogueBtn: "ग्रंथसूची शोधा (नवीन टॅब)",
    catalogueCountLabel: "ग्रंथ",

    // Links
    quickLinksTitle: "थेट संकेतस्थळ उघडून तपासा:",
    linkHome: "मुख्य पृष्ठ",
    linkCatalogue: "ग्रंथसूची",
    linkEvents: "कार्यक्रम",
    linkGallery: "छायाचित्रे",
    linkMembership: "सभासदत्व",

    // Gallery Page
    galleryPageTitle: "छायाचित्र दालन व बल्क अपलोड",
    galleryPageSubtitle: "साहित्यिक कार्यक्रम, व्याख्याने व ग्रंथालय स्मृती दालन व्यवस्थापन",
    galleryBulkBtn: "फोटो बल्क अपलोड करा (Bulk Upload)",
    galleryNewAlbumBtn: "नवीन अल्बम तयार करा",
    tabActiveAlbums: "सक्रिय अल्बम",
    tabArchivedAlbums: "अर्काईव्ह केलेले",
    loadingAlbums: "छायाचित्रे व अल्बम लोड होत आहेत...",
    noAlbumsFound: "कोणतेही अल्बम आढळले नाहीत.",
    noAlbumsHint: "नवीन अल्बम तयार करा किंवा फोटो बल्क अपलोड करा बटण वापरा.",
    featuredBadge: "मुख्य दालन",
    itemsLabel: "छायाचित्रे",
    btnEdit: "संपादित करा",
    btnManageMedia: "+ बल्क फोटो",
    btnDelete: "हटवा",

    // Bulk Modal
    bulkModalTitle: "छायाचित्रे बल्क अपलोड करा (Bulk Picture Upload)",
    bulkSelectAlbumLabel: "१. कोणत्या अल्बममध्ये फोटो अपलोड करायचे आहेत? *",
    bulkSelectFilesLabel: "२. एकाच वेळी ५, १०, २५ किंवा अधिक फोटो निवडा (Select Photos):",
    bulkDragDropText: "येथे क्लिक करून कॉम्प्युटरवरून अनेक फोटो निवडा, किंवा ड्रॅग करा",
    bulkDragDropHint: "JPG, PNG, WEBP स्वरूपातील अनेक छायाचित्रे एकाच वेळी निवडता येतात.",
    bulkSelectedCount: "निवडलेली छायाचित्रे",
    bulkClearAll: "सर्व काढा",
    bulkPasteUrlsLabel: "पर्यायी: वेबवरील अनेक फोटो लिंक्स पेस्ट करा (प्रत्येक ओळीवर १ URL):",
    bulkUploadBtn: "सर्व फोटो एकदम अपलोड करा",
    bulkUploadingBtn: "अपलोड होत आहे...",
    bulkProgressLabel: "अपलोड प्रगती",
    bulkSuccessMsg: "यशस्वी! छायाचित्रे अल्बममध्ये जोडली गेली.",
    cancelBtn: "रद्द करा",

    // Album Modal
    albumModalNewTitle: "नवीन छायाचित्र अल्बम तयार करा",
    albumModalEditTitle: "अल्बम संपादित करा",
    albumTitleLabel: "अल्बमचे नाव (Album Title) *",
    albumTitlePlaceholder: "उदा. ग्रंथदिंडी सोहळा २०२५ किंवा व्याख्यानमाला",
    albumCategoryLabel: "वर्गवारी (Category)",
    albumCoverLabel: "मुख्य कव्हर फोटो URL (ऐच्छिक)",
    albumCoverPlaceholder: "https://... (रिकामे ठेवल्यास पहिला फोटो आपोआप कव्हर बनेल)",
    albumFeaturedLabel: "हा अल्बम सार्वजनिक गॅलरीत 'मुख्य अल्बम' म्हणून ठळकपणे दाखवा",
    albumSaveBtn: "बदल जतन करा",
    albumCreateBtn: "अल्बम तयार करा",

    // Media Modal
    mediaModalTitle: "छायाचित्रे व्यवस्थापन",
    mediaQuickBulkPrompt: "या अल्बममध्ये अनेक छायाचित्रे एकत्र अपलोड करायची आहेत का?",
    mediaQuickBulkHint: "कॉम्प्युटरवरून १०, २० किंवा ५० फोटो एकाच वेळी निवडता येतात.",
    mediaQuickBulkBtn: "बल्क फोटो अपलोड उघडा",
    mediaAddSingleTitle: "एकल फोटो लिंक किंवा YouTube व्हिडिओ जोडा",
    mediaTypeLabel: "प्रकार",
    mediaTypePhoto: "छायाचित्र (Photo URL)",
    mediaTypeVideo: "व्हिडिओ (YouTube URL)",
    mediaUrlLabel: "फोटो किंवा व्हिडिओ URL *",
    mediaAddBtn: "जोडा",
    mediaItemsListTitle: "या अल्बममधील छायाचित्रे",
    mediaSelectAll: "सर्व निवडा",
    mediaDeselectAll: "निवड रद्द करा",
    mediaDeleteSelected: "फोटो हटवा",
    mediaEmptyNotice: "या अल्बममध्ये सध्या कोणतीही छायाचित्रे नाहीत. वरून बल्क अपलोड करा.",

    // Carousel Page
    carouselPageTitle: "मुख्य पृष्ठ फिरते बॅनर (Hero Carousel)",
    carouselPageSubtitle: "वेबसाइटच्या मुख्य पृष्ठावरील मोठे फोटो बॅनर, मथळे व बटणे बदला",
    carouselAddBtn: "नवीन स्लाइड जोडा",
    carouselNoSlides: "सध्या कोणत्याही स्लाइड्स नाहीत.",
    carouselSlideOrder: "क्रम",
    carouselActiveBadge: "सक्रिय",
    carouselInactiveBadge: "बंद",
    carouselModalNewTitle: "नवीन स्लाइड जोडा",
    carouselModalEditTitle: "स्लाइड संपादित करा",
    carouselHeadingLabel: "मुख्य मथळा (Heading) *",
    carouselHeadingPlaceholder: "उदा. ८०+ वर्षांचा साहित्यिक वारसा",
    carouselSubtitleLabel: "उप-मथळा (Subtitle)",
    carouselSubtitlePlaceholder: "उदा. अंबाजोगाईच्या सांस्कृतिक जीवनाचे स्पंदन",
    carouselButtonTextLabel: "बटणाचा मजकूर (Button Text)",
    carouselButtonUrlLabel: "बटणाची लिंक (Button Link)",
    carouselImageLabel: "छायाचित्र URL (Image URL) *",
    carouselActiveCheckLabel: "वेबसाइटवर लगेच सुरू करा",
    carouselSaveBtn: "स्लाइड सेव्ह करा",

    // Noticeboard Page
    noticePageTitle: "परिपत्रके व नोटीस फलक (Noticeboard)",
    noticePageSubtitle: "वाचकांसाठी अधिकृत परिपत्रके, नियमावली व सूचना व्यवस्थापन",
    noticeAddBtn: "नवीन नोटीस जोडा",
    noticeListTitle: "नोंदणीकृत परिपत्रके व सूचना",
    noticeNoNotices: "सध्या कोणतीही नोटीस नाही.",
    noticeModalNewTitle: "नवीन नोटीस तयार करा",
    noticeModalEditTitle: "नोटीस संपादित करा",
    noticeTitleLabel: "नोटीसचे शीर्षक (Title) *",
    noticeTitlePlaceholder: "उदा. वाचक मेळावा व ग्रंथप्रदर्शन",
    noticeContentLabel: "सविस्तर मजकूर (Content) *",
    noticeContentPlaceholder: "उदा. सर्व वाचकांना सूचित करण्यात येते की...",
    noticePriorityLabel: "प्राधान्य (Priority)",
    noticePriorityUrgent: "तातडीची (Urgent)",
    noticePriorityHigh: "महत्त्वाची (High)",
    noticePriorityNormal: "सामान्य (Normal)",
    noticePriorityLow: "कमी (Low)",
    noticeActiveCheckLabel: "वेबसाइटवर सुरू ठेवा",
    noticeSaveBtn: "नोटीस सेव्ह करा",

    // Categories
    catEvents: "साहित्यिक कार्यक्रम (Events)",
    catLibrary: "ग्रंथालय दालन (Library)",
    catHeritage: "ऐतिहासिक व दुर्मीळ स्मृती (Heritage)",
    catGeneral: "सर्वसाधारण (General)",
  },

  en: {
    // Topbar
    adminTitle: "Sahitya Niketan",
    adminSubtitle: "Admin Control Panel • Library Management",
    adminBadge: "Administrator",
    viewWebsite: "View Live Website",
    signOut: "Sign Out",
    menuOpen: "Open Menu",
    cmsPortal: "Library CMS Portal",
    navDashboard: "Dashboard",
    navDashboardSub: "Main Overview",
    navNotices: "Notices & Banner",
    navNoticesSub: "Daily Announcement",
    navGallery: "Gallery & Bulk Upload",
    navGallerySub: "Photos & Albums",
    navCarousel: "Hero Carousel",
    navCarouselSub: "Homepage Banners",
    navCatalogue: "Book Catalogue",
    navCatalogueSub: "39,953+ Volumes",
    switchLang: "मराठी मध्ये बदला",

    // Dashboard
    dashHeadline: "Admin Control Panel",
    dashSubheadline: "Sahitya Niketan Library, Ambajogai • Official CMS Portal",
    todayLabel: "Today",
    announcementTitle: "Website Announcement (Top Sticky Banner)",
    announcementSubtitle: "Update the live announcement banner shown at the very top of the website.",
    statusActive: "Active on Website",
    statusInactive: "Hidden from Website",
    toggleHide: "Hide",
    toggleShow: "Activate",
    currentMessageLabel: "Current Announcement Message:",
    announcementPlaceholder: "e.g. Sahitya Niketan Library is open for all readers during regular hours.",
    saveChanges: "Save Notice Changes",
    savingChanges: "Saving...",
    saveSuccess: "Announcement updated and live on website!",
    openAllNotices: "Open Full Noticeboard & Circulars",

    // Bulk Card
    bulkCardBadge: "New Feature",
    bulkCardTitle: "Bulk Picture Upload",
    bulkCardDesc: "Select and upload 10, 25, or 50+ photos at once into event albums and memory archives.",
    bulkCardBtn: "Open Bulk Uploader →",

    // Modules
    cmsModulesTitle: "Website CMS Management Modules",
    refreshBtn: "Refresh",
    carouselTitle: "Homepage Carousel Slides",
    carouselDesc: "Manage the rotating promotional photo banners, titles, and button links on the homepage.",
    carouselBtn: "Manage Carousel Slides",
    carouselCountLabel: "slides",
    galleryTitle: "Photo Gallery & Albums",
    galleryDesc: "Create event albums and upload commemorative photos in bulk.",
    galleryBtn: "Manage Albums & Photos",
    galleryCountLabel: "albums",
    catalogueTitle: "Book Catalogue & Holdings",
    catalogueDesc: "Browse and search through 39,953+ registered printed books, novels, and rare manuscripts.",
    catalogueBtn: "Open Catalogue (New Tab)",
    catalogueCountLabel: "books",

    // Links
    quickLinksTitle: "Inspect Live Website Pages:",
    linkHome: "Home Page",
    linkCatalogue: "Catalogue",
    linkEvents: "Events",
    linkGallery: "Photo Gallery",
    linkMembership: "Membership",

    // Gallery Page
    galleryPageTitle: "Photo Gallery & Bulk Upload",
    galleryPageSubtitle: "Manage literary events, guest lectures, and commemorative library photo albums",
    galleryBulkBtn: "Bulk Upload Photos",
    galleryNewAlbumBtn: "Create New Album",
    tabActiveAlbums: "Active Albums",
    tabArchivedAlbums: "Archived",
    loadingAlbums: "Loading albums and pictures...",
    noAlbumsFound: "No albums found in database.",
    noAlbumsHint: "Click 'Create New Album' or 'Bulk Upload Photos' to get started.",
    featuredBadge: "Featured",
    itemsLabel: "photos",
    btnEdit: "Edit",
    btnManageMedia: "+ Bulk Photos",
    btnDelete: "Delete",

    // Bulk Modal
    bulkModalTitle: "Bulk Picture Upload",
    bulkSelectAlbumLabel: "1. Select destination album: *",
    bulkSelectFilesLabel: "2. Select multiple photos (5, 10, 25, or 50+ photos):",
    bulkDragDropText: "Click here to choose multiple photos from your computer, or drag & drop",
    bulkDragDropHint: "Supported formats: JPG, PNG, WEBP. You can select dozens of images at once.",
    bulkSelectedCount: "Selected Photos",
    bulkClearAll: "Clear All",
    bulkPasteUrlsLabel: "Optional: Paste multiple image URLs (one per line):",
    bulkUploadBtn: "Upload All Photos Now",
    bulkUploadingBtn: "Uploading to Storage...",
    bulkProgressLabel: "Upload Progress",
    bulkSuccessMsg: "Success! Photos were uploaded and added to the album.",
    cancelBtn: "Cancel",

    // Album Modal
    albumModalNewTitle: "Create New Photo Album",
    albumModalEditTitle: "Edit Album Details",
    albumTitleLabel: "Album Title *",
    albumTitlePlaceholder: "e.g. Granth Dindi Celebrations 2025 or Annual Lecture Series",
    albumCategoryLabel: "Category",
    albumCoverLabel: "Cover Image URL (Optional)",
    albumCoverPlaceholder: "https://... (Leave empty to use the first uploaded photo as cover)",
    albumFeaturedLabel: "Feature this album prominently on the public gallery page",
    albumSaveBtn: "Save Changes",
    albumCreateBtn: "Create Album",

    // Media Modal
    mediaModalTitle: "Manage Album Media",
    mediaQuickBulkPrompt: "Want to upload multiple photos to this album?",
    mediaQuickBulkHint: "You can drag and drop 10, 20, or 50 images at once with the bulk uploader.",
    mediaQuickBulkBtn: "Open Bulk Uploader",
    mediaAddSingleTitle: "Add Single Photo Link or YouTube Video",
    mediaTypeLabel: "Media Type",
    mediaTypePhoto: "Photo Image URL",
    mediaTypeVideo: "YouTube Video URL",
    mediaUrlLabel: "Media URL *",
    mediaAddBtn: "Add to Album",
    mediaItemsListTitle: "Photos in this Album",
    mediaSelectAll: "Select All",
    mediaDeselectAll: "Deselect All",
    mediaDeleteSelected: "Delete Selected",
    mediaEmptyNotice: "No photos in this album yet. Use the bulk uploader above to add photos.",

    // Carousel Page
    carouselPageTitle: "Hero Carousel Slides",
    carouselPageSubtitle: "Manage rotating promotional banners, headlines, and links on the homepage",
    carouselAddBtn: "Add New Slide",
    carouselNoSlides: "No slides found in database.",
    carouselSlideOrder: "Order",
    carouselActiveBadge: "Active",
    carouselInactiveBadge: "Inactive",
    carouselModalNewTitle: "Add New Slide",
    carouselModalEditTitle: "Edit Slide",
    carouselHeadingLabel: "Main Headline *",
    carouselHeadingPlaceholder: "e.g. 80+ Years of Literary Heritage",
    carouselSubtitleLabel: "Subtitle",
    carouselSubtitlePlaceholder: "e.g. The cultural heartbeat of Ambajogai",
    carouselButtonTextLabel: "Button Text",
    carouselButtonUrlLabel: "Button Link URL",
    carouselImageLabel: "Image URL *",
    carouselActiveCheckLabel: "Publish active on homepage",
    carouselSaveBtn: "Save Slide",

    // Noticeboard Page
    noticePageTitle: "Noticeboard & Circulars",
    noticePageSubtitle: "Manage official library notices, guidelines, and circulars for readers",
    noticeAddBtn: "Add New Notice",
    noticeListTitle: "Registered Notices & Circulars",
    noticeNoNotices: "No notices currently registered.",
    noticeModalNewTitle: "Create New Notice",
    noticeModalEditTitle: "Edit Notice",
    noticeTitleLabel: "Notice Title *",
    noticeTitlePlaceholder: "e.g. Reader Meetup & Book Exhibition",
    noticeContentLabel: "Detailed Content *",
    noticeContentPlaceholder: "e.g. All library members are hereby notified that...",
    noticePriorityLabel: "Priority",
    noticePriorityUrgent: "Urgent",
    noticePriorityHigh: "High",
    noticePriorityNormal: "Normal",
    noticePriorityLow: "Low",
    noticeActiveCheckLabel: "Active on website",
    noticeSaveBtn: "Save Notice",

    // Categories
    catEvents: "Literary Events",
    catLibrary: "Library Campus",
    catHeritage: "Heritage & Rarities",
    catGeneral: "General",
  },
};
