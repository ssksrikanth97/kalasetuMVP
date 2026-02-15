(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/events/events.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionsContainer": "events-module__t7I_bG__actionsContainer",
  "backLink": "events-module__t7I_bG__backLink",
  "btnAdd": "events-module__t7I_bG__btnAdd",
  "btnEdit": "events-module__t7I_bG__btnEdit",
  "btnRemove": "events-module__t7I_bG__btnRemove",
  "container": "events-module__t7I_bG__container",
  "date": "events-module__t7I_bG__date",
  "eventCard": "events-module__t7I_bG__eventCard",
  "eventGrid": "events-module__t7I_bG__eventGrid",
  "eventInfo": "events-module__t7I_bG__eventInfo",
  "form": "events-module__t7I_bG__form",
  "header": "events-module__t7I_bG__header",
  "location": "events-module__t7I_bG__location",
  "pageWrapper": "events-module__t7I_bG__pageWrapper",
  "preview": "events-module__t7I_bG__preview",
  "previewContainer": "events-module__t7I_bG__previewContainer",
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firebase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/storage/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/admin/events/events.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ManageEvents() {
    _s();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
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
            const fetchEvents = {
                "ManageEvents.useEffect.fetchEvents": async ()=>{
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
                    setLoading(false);
                }
            }["ManageEvents.useEffect.fetchEvents"];
            fetchEvents();
        }
    }["ManageEvents.useEffect"], []);
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
        setLoading(true);
        try {
            let imageUrl = newEvent.imageUrl || '';
            let videoUrl = newEvent.videoUrl || '';
            let galleryUrls = newEvent.galleryUrls || [];
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
                gallery: galleryUrls
            };
            if (isEditing) {
                const eventDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'events', currentEvent.id);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(eventDoc, eventData);
                setEvents(events.map((event)=>event.id === currentEvent.id ? {
                        ...event,
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
        setLoading(false);
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
            imageUrl: event.imageUrl,
            videoUrl: event.videoUrl,
            galleryUrls: event.gallery || [],
            imageFile: null,
            videoFile: null
        });
        setGalleryFiles([]);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageWrapper,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Manage Events"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/events/page.js",
                        lineNumber: 152,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/events/page.js",
                    lineNumber: 151,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: isEditing ? 'Edit Event' : 'Create New Event'
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/events/page.js",
                            lineNumber: 156,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleFormSubmit,
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
                                    lineNumber: 158,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    name: "description",
                                    value: newEvent.description,
                                    onChange: handleInputChange,
                                    placeholder: "Event Description"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 159,
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
                                    lineNumber: 160,
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
                                    lineNumber: 161,
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
                                    lineNumber: 162,
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
                                    lineNumber: 163,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: "Main Image"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 166,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            name: "imageFile",
                                            onChange: handleFileChange,
                                            accept: "image/*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 167,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 165,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: "Main Video"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 171,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            name: "videoFile",
                                            onChange: handleFileChange,
                                            accept: "video/*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 172,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 170,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: "Image & Video Gallery (multiple files)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 176,
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
                                            lineNumber: 177,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 175,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    children: loading ? 'Saving...' : 'Save Event'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 180,
                                    columnNumber: 25
                                }, this),
                                isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: resetForm,
                                    style: {
                                        marginLeft: '1rem',
                                        background: '#666'
                                    },
                                    children: "Cancel Edit"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 181,
                                    columnNumber: 39
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/events/page.js",
                            lineNumber: 157,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/events/page.js",
                    lineNumber: 155,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "Existing Events"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/events/page.js",
                    lineNumber: 185,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventGrid,
                    children: events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventCard,
                            children: [
                                event.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: event.imageUrl,
                                    alt: event.name
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 189,
                                    columnNumber: 48
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventInfo,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: event.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 191,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].date,
                                            children: new Date(event.date).toLocaleDateString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 192,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].location,
                                            children: event.location
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 193,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "Artists Needed: ",
                                                event.artistsNeeded
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 194,
                                            columnNumber: 33
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
                                                    lineNumber: 196,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDelete(event.id),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$events$2f$events$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnRemove,
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/events/page.js",
                                                    lineNumber: 197,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/events/page.js",
                                            lineNumber: 195,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/events/page.js",
                                    lineNumber: 190,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, event.id, true, {
                            fileName: "[project]/src/app/admin/events/page.js",
                            lineNumber: 188,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/events/page.js",
                    lineNumber: 186,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/events/page.js",
            lineNumber: 150,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/events/page.js",
        lineNumber: 149,
        columnNumber: 9
    }, this);
}
_s(ManageEvents, "5d+59NVoov3Ofde1D0bA42ZmZfE=");
_c = ManageEvents;
var _c;
__turbopack_context__.k.register(_c, "ManageEvents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_admin_events_1e1f842f._.js.map