(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/dashboard/admin.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionButton": "admin-module__a3EyKq__actionButton",
  "activityContent": "admin-module__a3EyKq__activityContent",
  "activityIcon": "admin-module__a3EyKq__activityIcon",
  "activityItem": "admin-module__a3EyKq__activityItem",
  "activityTime": "admin-module__a3EyKq__activityTime",
  "avatar": "admin-module__a3EyKq__avatar",
  "cardHeader": "admin-module__a3EyKq__cardHeader",
  "cardTitle": "admin-module__a3EyKq__cardTitle",
  "contentCard": "admin-module__a3EyKq__contentCard",
  "dashboardContainer": "admin-module__a3EyKq__dashboardContainer",
  "dateBadge": "admin-module__a3EyKq__dateBadge",
  "header": "admin-module__a3EyKq__header",
  "logoContainer": "admin-module__a3EyKq__logoContainer",
  "logoText": "admin-module__a3EyKq__logoText",
  "mainContent": "admin-module__a3EyKq__mainContent",
  "navIcon": "admin-module__a3EyKq__navIcon",
  "navItem": "admin-module__a3EyKq__navItem",
  "navItemActive": "admin-module__a3EyKq__navItemActive",
  "navLinks": "admin-module__a3EyKq__navLinks",
  "sectionGrid": "admin-module__a3EyKq__sectionGrid",
  "sidebar": "admin-module__a3EyKq__sidebar",
  "statCard": "admin-module__a3EyKq__statCard",
  "statHeader": "admin-module__a3EyKq__statHeader",
  "statIcon": "admin-module__a3EyKq__statIcon",
  "statTitle": "admin-module__a3EyKq__statTitle",
  "statTrend": "admin-module__a3EyKq__statTrend",
  "statValue": "admin-module__a3EyKq__statValue",
  "statsGrid": "admin-module__a3EyKq__statsGrid",
  "statusApproved": "admin-module__a3EyKq__statusApproved",
  "statusBadge": "admin-module__a3EyKq__statusBadge",
  "statusPending": "admin-module__a3EyKq__statusPending",
  "table": "admin-module__a3EyKq__table",
  "tableContainer": "admin-module__a3EyKq__tableContainer",
  "titleGroup": "admin-module__a3EyKq__titleGroup",
  "trendDown": "admin-module__a3EyKq__trendDown",
  "trendUp": "admin-module__a3EyKq__trendUp",
  "userProfile": "admin-module__a3EyKq__userProfile",
});
}),
"[project]/src/app/admin/events/events.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionsContainer": "events-module__t7I_bG__actionsContainer",
  "btnEdit": "events-module__t7I_bG__btnEdit",
  "btnRemove": "events-module__t7I_bG__btnRemove",
  "eventCard": "events-module__t7I_bG__eventCard",
  "eventGrid": "events-module__t7I_bG__eventGrid",
  "eventImage": "events-module__t7I_bG__eventImage",
  "eventInfo": "events-module__t7I_bG__eventInfo",
  "fileInputContainer": "events-module__t7I_bG__fileInputContainer",
  "formActions": "events-module__t7I_bG__formActions",
  "formCard": "events-module__t7I_bG__formCard",
  "formGrid": "events-module__t7I_bG__formGrid",
});
}),
"[project]/src/app/admin/events/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ManageEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firebase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/storage/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/admin/dashboard/admin.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/admin/events/events.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function ManageEvents() {
    _s();
    const { user, userRole, loading: authLoading, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [formLoading, setFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [eventsLoading, setEventsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentEvent, setCurrentEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newEvent, setNewEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        description: '',
        date: '',
        location: '',
        artists: '',
        artistsNeeded: '',
        imageFile: null,
        videoFile: null
    });
    const [galleryFiles, setGalleryFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManageEvents.useEffect": ()=>{
            if (!authLoading) {
                if (!user || userRole !== 'admin') {
                    router.push('/auth/login');
                }
            }
        }
    }["ManageEvents.useEffect"], [
        user,
        userRole,
        authLoading,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManageEvents.useEffect": ()=>{
            const fetchEvents = {
                "ManageEvents.useEffect.fetchEvents": async ()=>{
                    setEventsLoading(true);
                    try {
                        const eventsCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'events');
                        const eventSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(eventsCollection);
                        const eventsData = eventSnapshot.docs.map({
                            "ManageEvents.useEffect.fetchEvents.eventsData": (doc)=>({
                                    id: doc.id,
                                    ...doc.data()
                                })
                        }["ManageEvents.useEffect.fetchEvents.eventsData"]);
                        setEvents(eventsData);
                    } catch (error) {
                        console.error("Error fetching events:", error);
                    }
                    setEventsLoading(false);
                }
            }["ManageEvents.useEffect.fetchEvents"];
            if (user) {
                fetchEvents();
            }
        }
    }["ManageEvents.useEffect"], [
        user
    ]);
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value
        });
    };
    const handleFileChange = (e)=>{
        const { name, files } = e.target;
        if (name === 'gallery') {
            setGalleryFiles(Array.from(files));
        } else {
            setNewEvent({
                ...newEvent,
                [name]: files[0]
            });
        }
    };
    const uploadFile = async (file)=>{
        if (!file) return null;
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"], `events/${Date.now()}_${file.name}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadBytes"])(storageRef, file);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDownloadURL"])(storageRef);
    };
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        if (!user) {
            console.error("Cannot submit form: User is not authenticated.");
            return;
        }
        setFormLoading(true);
        try {
            let imageUrl = currentEvent?.imageUrl || '';
            let videoUrl = currentEvent?.videoUrl || '';
            let galleryUrls = currentEvent?.gallery || [];
            if (newEvent.imageFile) {
                imageUrl = await uploadFile(newEvent.imageFile);
            }
            if (newEvent.videoFile) {
                videoUrl = await uploadFile(newEvent.videoFile);
            }
            if (galleryFiles.length > 0) {
                galleryUrls = await Promise.all(galleryFiles.map((file)=>uploadFile(file)));
            }
            const eventData = {
                name: newEvent.title,
                description: newEvent.description,
                date: newEvent.date,
                location: newEvent.location,
                artists: newEvent.artists.split(',').map((s)=>s.trim()),
                artistsNeeded: newEvent.artistsNeeded,
                imageUrl,
                videoUrl,
                gallery: galleryUrls,
                status: 'approved'
            };
            if (isEditing) {
                const eventDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'events', currentEvent.id);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(eventDoc, eventData);
                setEvents(events.map((event)=>event.id === currentEvent.id ? {
                        id: event.id,
                        ...eventData
                    } : event));
            } else {
                const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'events'), eventData);
                setEvents([
                    ...events,
                    {
                        id: docRef.id,
                        ...eventData
                    }
                ]);
            }
            resetForm();
        } catch (error) {
            console.error("Error saving event:", error);
        }
        setFormLoading(false);
    };
    const handleEdit = (event)=>{
        setIsEditing(true);
        setCurrentEvent(event);
        setNewEvent({
            title: event.name || '',
            description: event.description || '',
            date: event.date || '',
            location: event.location || '',
            artists: (event.artists || []).join(', '),
            artistsNeeded: event.artistsNeeded || '',
            imageFile: null,
            videoFile: null
        });
        setGalleryFiles([]);
        window.scrollTo(0, 0);
    };
    const handleDelete = async (id)=>{
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'events', id));
                setEvents(events.filter((event)=>event.id !== id));
            } catch (error) {
                console.error("Error deleting event: ", error);
            }
        }
    };
    const resetForm = ()=>{
        setIsEditing(false);
        setCurrentEvent(null);
        setNewEvent({
            title: '',
            description: '',
            date: '',
            location: '',
            artists: '',
            artistsNeeded: '',
            imageFile: null,
            videoFile: null
        });
        setGalleryFiles([]);
    };
    if (authLoading || !user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
            style: {
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--color-maroon)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "spinner"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/events/page.js",
                    lineNumber: 170,
                    columnNumber: 17
                }, this),
                " Loading Admin Portal..."
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/events/page.js",
            lineNumber: 169,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoContainer,
                        style: {
                            padding: '0 1rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                width: '100%',
                                height: '40px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/logo.png",
                                alt: "KalaSetu Admin",
                                fill: true,
                                style: {
                                    objectFit: 'contain',
                                    objectPosition: 'left'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 180,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/events/page.js",
                            lineNumber: 179,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/events/page.js",
                        lineNumber: 178,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLinks,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/dashboard",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 190,
                                        columnNumber: 25
                                    }, this),
                                    " Dashboard"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 189,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/users",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "👥"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 193,
                                        columnNumber: 25
                                    }, this),
                                    " Users & Approvals"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 192,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/inventory",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "📦"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 196,
                                        columnNumber: 25
                                    }, this),
                                    " Inventory"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 195,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/orders",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "🛍️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 199,
                                        columnNumber: 25
                                    }, this),
                                    " Orders"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 198,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/bookings",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "📅"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 202,
                                        columnNumber: 25
                                    }, this),
                                    " Bookings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 201,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/events",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItemActive}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "🎉"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 205,
                                        columnNumber: 25
                                    }, this),
                                    " Manage Events"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 204,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                target: "_blank",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                style: {
                                    marginTop: 'auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "🌐"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 208,
                                        columnNumber: 25
                                    }, this),
                                    " Live Site"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 207,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: logout,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                style: {
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    width: '100%'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "🚪"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 211,
                                        columnNumber: 25
                                    }, this),
                                    " Logout"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 210,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/events/page.js",
                        lineNumber: 188,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/events/page.js",
                lineNumber: 177,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    children: "Manage Events"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 219,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Create, edit, and manage all cultural events."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 220,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/events/page.js",
                            lineNumber: 218,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/events/page.js",
                        lineNumber: 217,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formCard}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeader,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                    children: isEditing ? 'Edit Event' : 'Create New Event'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 226,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 225,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleFormSubmit,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGrid,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "title",
                                        value: newEvent.title,
                                        onChange: handleInputChange,
                                        placeholder: "Event Title",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 229,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "description",
                                        value: newEvent.description,
                                        onChange: handleInputChange,
                                        placeholder: "Event Description"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 230,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        name: "date",
                                        value: newEvent.date,
                                        onChange: handleInputChange,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 231,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "location",
                                        value: newEvent.location,
                                        onChange: handleInputChange,
                                        placeholder: "Location"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 232,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "artists",
                                        value: newEvent.artists,
                                        onChange: handleInputChange,
                                        placeholder: "Performing Artists (comma-separated)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 233,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "artistsNeeded",
                                        value: newEvent.artistsNeeded,
                                        onChange: handleInputChange,
                                        placeholder: "No. of Artists Needed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 234,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fileInputContainer,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "Main Image"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 237,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                name: "imageFile",
                                                onChange: handleFileChange,
                                                accept: "image/*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 238,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 236,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fileInputContainer,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "Main Video"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 242,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                name: "videoFile",
                                                onChange: handleFileChange,
                                                accept: "video/*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 243,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 241,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fileInputContainer,
                                        style: {
                                            gridColumn: '1 / -1'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "Image & Video Gallery (multiple files)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 247,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                name: "gallery",
                                                onChange: handleFileChange,
                                                accept: "image/*,video/*",
                                                multiple: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 248,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 246,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formActions,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "btn-primary",
                                                disabled: formLoading,
                                                children: formLoading ? 'Saving...' : 'Save Event'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 252,
                                                columnNumber: 29
                                            }, this),
                                            isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: resetForm,
                                                className: "btn-secondary",
                                                children: "Cancel Edit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 253,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 251,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 228,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/events/page.js",
                        lineNumber: 224,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeader,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                    children: "Existing Events"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 260,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 259,
                                columnNumber: 21
                            }, this),
                            eventsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "spinner"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 262,
                                columnNumber: 38
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventGrid,
                                children: events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventCard,
                                        children: [
                                            event.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: event.imageUrl,
                                                alt: event.name,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventImage
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 266,
                                                columnNumber: 56
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventInfo,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: event.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/events/page.js",
                                                        lineNumber: 268,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: new Date(event.date).toLocaleDateString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/events/page.js",
                                                        lineNumber: 269,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: event.location
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/events/page.js",
                                                        lineNumber: 270,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Artists Needed: ",
                                                            event.artistsNeeded
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/events/page.js",
                                                        lineNumber: 271,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionsContainer,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleEdit(event),
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnEdit,
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/events/page.js",
                                                                lineNumber: 273,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleDelete(event.id),
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnRemove,
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/events/page.js",
                                                                lineNumber: 274,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/events/page.js",
                                                        lineNumber: 272,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/events/page.js",
                                                lineNumber: 267,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, event.id, true, {
                                        fileName: "[project]/src/app/admin/events/page.js",
                                        lineNumber: 265,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/events/page.js",
                                lineNumber: 263,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/events/page.js",
                        lineNumber: 258,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/events/page.js",
                lineNumber: 216,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/events/page.js",
        lineNumber: 176,
        columnNumber: 9
    }, this);
}
_s(ManageEvents, "+Ct5udqeJoQYN32QS5FsKrDy1hw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ManageEvents;
var _c;
__turbopack_context__.k.register(_c, "ManageEvents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_admin_53cc32b8._.js.map