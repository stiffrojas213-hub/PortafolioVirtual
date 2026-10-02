// Estructura de carpetas inicial
const initialFolders = [
    {
        id: 'taller8',
        name: 'Taller VIII: Desarrollo de Apps II',
        subtitle: 'Docente: Ing. Roberto Mendoza',
        tag: 'Semestre VIII',
        category: 'asignaturas',
        icon: 'fa-laptop-code',
        color: 'blue',
        subfolders: [],
        files: [
            {
                id: 'f1',
                name: 'Informe_Semana_01_Desarrollo_Apps.docx',
                size: '245 KB',
                type: 'docx',
                icon: 'fa-file-word',
                color: 'text-blue-400',
                content: '<h1>INFORME TALLER VIII: DESARROLLO DE APLICACIONES II</h1><p><strong>Autor:</strong> Stiff Angel Rojas Ruiz</p><p>Este documento es un informe de muestra renderizado en tiempo real por Mammoth.js.</p><h2>Objetivos del Proyecto</h2><ul><li>Implementación de arquitectura limpia en la web.</li><li>Visualización nativa de documentos sin plugins externos.</li></ul>'
            },
            {
                id: 'f2',
                name: 'Manual_Usuario_Sistema.pdf',
                size: '1.4 MB',
                type: 'pdf',
                icon: 'fa-file-pdf',
                color: 'text-red-400',
                dataUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            }
        ]
    },
    {
        id: 'algoritmos',
        name: 'Algoritmos y Estructura de Datos',
        subtitle: 'Docente: Dra. María Torres',
        tag: 'Semestre IV',
        category: 'asignaturas',
        icon: 'fa-diagram-project',
        color: 'emerald',
        subfolders: [],
        files: [
            {
                id: 'f3',
                name: 'Estructuras_Datos_Arboles_AVL.cpp',
                size: '18 KB',
                type: 'code',
                icon: 'fa-file-code',
                color: 'text-emerald-400',
                content: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Arboles Balanceados AVL - Stiff Angel Rojas Ruiz" << endl;\n    return 0;\n}`
            }
        ]
    },
    {
        id: 'proyectoGrado',
        name: 'Proyecto de Tesis Grado',
        subtitle: 'Sistema Web de Gestión Multiformato',
        tag: 'En Curso',
        category: 'proyectos',
        icon: 'fa-box-archive',
        color: 'amber',
        subfolders: [],
        files: []
    },
    {
        id: 'certificaciones',
        name: 'Certificaciones y Diplomas',
        subtitle: 'Cursos, Talleres y Diplomas',
        tag: 'Archivos PDF',
        category: 'proyectos',
        icon: 'fa-certificate',
        color: 'rose',
        subfolders: [],
        files: []
    }
];

// Estado global
let rootFolders = loadFoldersFromStorage();
let navigationStack = [];
let currentTab = 'asignaturas';
let currentImageScale = 1;

function loadFoldersFromStorage() {
    try {
        const saved = localStorage.getItem('stiff_portfolio_folders_v2');
        return saved ? JSON.parse(saved) : initialFolders;
    } catch (e) {
        return initialFolders;
    }
}

function saveFoldersToStorage() {
    try {
        localStorage.setItem('stiff_portfolio_folders_v2', JSON.stringify(rootFolders));
    } catch (e) {
        alert('El espacio local está lleno. No se pudieron guardar los cambios.');
    }
}

function loadProfileFromStorage() {
    try {
        const profile = JSON.parse(localStorage.getItem('stiff_portfolio_profile'));
        if (profile) {
            if (profile.name) document.getElementById('user-name').textContent = profile.name;
            if (profile.title) document.getElementById('user-title').textContent = profile.title;
            if (profile.bio) document.getElementById('user-bio').textContent = profile.bio;
            if (profile.avatar) document.getElementById('user-avatar').src = profile.avatar;
        }
    } catch (e) {
        console.warn('Error al cargar perfil:', e);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadProfileFromStorage();
    renderMainGrids();
});

// NAVEGACIÓN PRINCIPAL
function showWindow(windowId) {
    document.querySelectorAll('.window-content').forEach(win => win.classList.add('hidden'));
    const targetWin = document.getElementById(`window-${windowId}`);
    if (targetWin) targetWin.classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`nav-${windowId}`);
    if (activeBtn) activeBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchMainTab(tab) {
    currentTab = tab;
    const btnAsig = document.getElementById('tab-btn-asignaturas');
    const btnProy = document.getElementById('tab-btn-proyectos');
    const secAsig = document.getElementById('section-asignaturas');
    const secProy = document.getElementById('section-proyectos');

    if (tab === 'asignaturas') {
        secAsig.classList.remove('hidden');
        secProy.classList.add('hidden');
        btnAsig.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all bg-brand-500/10 border border-brand-500/30 text-brand-500 flex items-center gap-2';
        btnProy.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900 border border-gray-800 text-gray-400 hover:text-white flex items-center gap-2';
    } else {
        secAsig.classList.add('hidden');
        secProy.classList.remove('hidden');
        btnProy.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all bg-brand-500/10 border border-brand-500/30 text-brand-500 flex items-center gap-2';
        btnAsig.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900 border border-gray-800 text-gray-400 hover:text-white flex items-center gap-2';
    }
    renderMainGrids();
}

function renderMainGrids() {
    const asigContainer = document.getElementById('section-asignaturas');
    const proyContainer = document.getElementById('section-proyectos');

    const asignaturas = rootFolders.filter(f => f.category === 'asignaturas');
    const proyectos = rootFolders.filter(f => f.category === 'proyectos');

    asigContainer.innerHTML = asignaturas.map(folder => createFolderCardHTML(folder)).join('');
    proyContainer.innerHTML = proyectos.map(folder => createFolderCardHTML(folder)).join('');
}

function createFolderCardHTML(folder) {
    const colorClasses = {
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
        emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
        amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
        rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
        brand: { bg: 'bg-brand-500/10', border: 'border-brand-500/30', text: 'text-brand-500' }
    };
    const c = colorClasses[folder.color] || colorClasses.brand;

    return `
        <div class="bg-slate-900/60 border border-gray-800 rounded-2xl p-5 hover:border-brand-500/50 transition-all group cursor-pointer relative" onclick="openRootFolder('${folder.id}')">
            <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text} text-xl group-hover:scale-105 transition-transform">
                    <i class="fa-solid ${folder.icon || 'fa-folder'}"></i>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] px-2 py-1 rounded bg-slate-800 text-gray-400 border border-gray-700">${folder.tag || 'Carpeta'}</span>
                    <button onclick="event.stopPropagation(); renameRootFolder('${folder.id}')" title="Renombrar Carpeta" class="text-gray-500 hover:text-amber-400 p-1">
                        <i class="fa-solid fa-pen-to-square text-xs"></i>
                    </button>
                    <button onclick="event.stopPropagation(); deleteRootFolder('${folder.id}')" title="Eliminar Carpeta" class="text-gray-500 hover:text-red-400 p-1">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
            </div>
            <h3 class="font-bold text-white text-sm group-hover:text-brand-500 transition-colors truncate">${folder.name}</h3>
            <p class="text-xs text-gray-400 mt-1 truncate">${folder.subtitle || 'Sin descripción'}</p>
            <div class="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between text-[11px] text-gray-400">
                <span><i class="fa-solid fa-folder-open text-brand-500 mr-1"></i> Abrir sección</span>
                <i class="fa-solid fa-arrow-right text-gray-500 group-hover:translate-x-1 transition-transform"></i>
            </div>
        </div>
    `;
}

function promptCreateRootFolder() {
    const name = prompt('Escribe el nombre de la nueva carpeta:');
    if (!name || !name.trim()) return;

    const newFolder = {
        id: 'rf_' + Date.now(),
        name: name.trim(),
        subtitle: 'Carpeta personalizada',
        tag: 'Usuario',
        category: currentTab,
        icon: 'fa-folder',
        color: 'brand',
        subfolders: [],
        files: []
    };

    rootFolders.push(newFolder);
    saveFoldersToStorage();
    renderMainGrids();
}

function renameRootFolder(folderId) {
    const folder = rootFolders.find(f => f.id === folderId);
    if (!folder) return;

    const newName = prompt('Escribe el nuevo nombre de la carpeta:', folder.name);
    if (newName && newName.trim() !== '') {
        folder.name = newName.trim();
        saveFoldersToStorage();
        renderMainGrids();
    }
}

function deleteRootFolder(folderId) {
    if (confirm('¿Deseas eliminar esta carpeta y todo su contenido?')) {
        rootFolders = rootFolders.filter(f => f.id !== folderId);
        saveFoldersToStorage();
        renderMainGrids();
    }
}

// NAVEGACIÓN DENTRO DE CARPETAS
function openRootFolder(folderId) {
    const folder = rootFolders.find(f => f.id === folderId);
    if (!folder) return;
    navigationStack = [folder];
    renderFolderModal();
    document.getElementById('folder-modal').classList.remove('hidden');
}

function renderFolderModal() {
    if (navigationStack.length === 0) return;

    const currentFolder = navigationStack[navigationStack.length - 1];
    document.getElementById('folder-modal-title').innerHTML = `<i class="fa-solid fa-folder-open text-brand-500"></i> ${currentFolder.name}`;

    const pathNames = navigationStack.map(f => f.name).join(' / ');
    document.getElementById('folder-breadcrumb').textContent = `Ruta: ${pathNames}`;

    const btnBack = document.getElementById('btn-go-back');
    if (navigationStack.length > 1) {
        btnBack.classList.remove('hidden');
    } else {
        btnBack.classList.add('hidden');
    }

    const container = document.getElementById('folder-file-list');
    const subfolders = currentFolder.subfolders || [];
    const files = currentFolder.files || [];

    if (subfolders.length === 0 && files.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500 text-xs bg-slate-950/40 rounded-xl border border-dashed border-gray-800">
                <i class="fa-solid fa-folder-open text-2xl mb-2 text-gray-600 block"></i>
                Carpeta vacía. Puedes crear subcarpetas, subir archivos o agregar URL.
            </div>
        `;
        return;
    }

    let html = '';

    subfolders.forEach((sub, idx) => {
        html += `
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-brand-500/20 hover:border-brand-500/50 transition-all cursor-pointer" onclick="openSubFolder(${idx})">
                <div class="flex items-center gap-3 overflow-hidden pr-2">
                    <div class="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center shrink-0 text-brand-500">
                        <i class="fa-solid fa-folder"></i>
                    </div>
                    <div class="truncate">
                        <h4 class="text-xs font-semibold text-white truncate">${sub.name}</h4>
                        <span class="text-[10px] text-gray-400">Carpeta</span>
                    </div>
                </div>

                <div class="flex items-center gap-1.5 shrink-0">
                    <span class="text-[11px] text-brand-500 font-semibold mr-1">Abrir <i class="fa-solid fa-chevron-right text-[9px]"></i></span>
                    <button onclick="event.stopPropagation(); renameSubFolder(${idx})" title="Renombrar Subcarpeta" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-amber-500/20 hover:text-amber-400 text-gray-400 text-xs flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="event.stopPropagation(); deleteSubFolder(${idx})" title="Eliminar Subcarpeta" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-gray-400 text-xs flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    });

    files.forEach((file, idx) => {
        const isUrl = file.type === 'url';
        html += `
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-gray-800 hover:border-gray-700 transition-all">
                <div class="flex items-center gap-3 overflow-hidden pr-2">
                    <div class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 ${file.color}">
                        <i class="fa-solid ${file.icon}"></i>
                    </div>
                    <div class="truncate">
                        <h4 class="text-xs font-semibold text-gray-200 truncate" title="${file.name}">${file.name}</h4>
                        <span class="text-[10px] text-gray-400">${file.size}</span>
                    </div>
                </div>

                <div class="flex items-center gap-1.5 shrink-0">
                    <button onclick="previewCurrentFile(${idx})" class="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-semibold transition-colors flex items-center gap-1">
                        <i class="fa-solid ${isUrl ? 'fa-arrow-up-right-from-square' : 'fa-eye'}"></i> <span class="hidden sm:inline">${isUrl ? 'ABRIR' : 'VER'}</span>
                    </button>
                    ${!isUrl ? `
                    <button onclick="downloadCurrentFile(${idx})" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 text-[11px] font-semibold transition-colors flex items-center gap-1">
                        <i class="fa-solid fa-download"></i>
                    </button>
                    ` : ''}
                    <button onclick="deleteCurrentFile(${idx})" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-gray-400 text-xs flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function openSubFolder(index) {
    const currentFolder = navigationStack[navigationStack.length - 1];
    const targetSub = currentFolder.subfolders[index];
    if (targetSub) {
        navigationStack.push(targetSub);
        renderFolderModal();
    }
}

function navigateUpFolder() {
    if (navigationStack.length > 1) {
        navigationStack.pop();
        renderFolderModal();
    }
}

function promptCreateSubFolder() {
    const name = prompt('Nombre de la nueva carpeta:');
    if (!name || !name.trim()) return;

    const currentFolder = navigationStack[navigationStack.length - 1];
    if (!currentFolder.subfolders) currentFolder.subfolders = [];

    currentFolder.subfolders.push({
        id: 'sf_' + Date.now(),
        name: name.trim(),
        subfolders: [],
        files: []
    });

    saveFoldersToStorage();
    renderFolderModal();
}

function renameSubFolder(index) {
    const currentFolder = navigationStack[navigationStack.length - 1];
    const targetSub = currentFolder.subfolders[index];
    if (!targetSub) return;

    const newName = prompt('Escribe el nuevo nombre para la subcarpeta:', targetSub.name);
    if (newName && newName.trim() !== '') {
        targetSub.name = newName.trim();
        saveFoldersToStorage();
        renderFolderModal();
    }
}

function promptAddUrlFile() {
    if (navigationStack.length === 0) return;

    const url = prompt('Ingresa la URL o enlace web (ej: https://github.com):');
    if (!url || !url.trim()) return;

    let validUrl = url.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
        validUrl = 'https://' + validUrl;
    }

    const title = prompt('Ingresa un título para este enlace:', validUrl);
    if (!title || !title.trim()) return;

    const currentFolder = navigationStack[navigationStack.length - 1];
    if (!currentFolder.files) currentFolder.files = [];

    const urlObj = {
        id: 'url_' + Date.now(),
        name: title.trim(),
        size: 'Enlace Web',
        type: 'url',
        icon: 'fa-globe',
        color: 'text-cyan-400',
        dataUrl: validUrl
    };

    currentFolder.files.unshift(urlObj);
    saveFoldersToStorage();
    renderFolderModal();
}

function deleteSubFolder(index) {
    if (confirm('¿Deseas eliminar esta subcarpeta y su contenido?')) {
        const currentFolder = navigationStack[navigationStack.length - 1];
        currentFolder.subfolders.splice(index, 1);
        saveFoldersToStorage();
        renderFolderModal();
    }
}

function closeFolderModal() {
    document.getElementById('folder-modal').classList.add('hidden');
    navigationStack = [];
}

// SUBIR Y GESTIONAR ARCHIVOS
function triggerFileUpload() {
    const fileInput = document.getElementById('file-upload-input');
    if (fileInput) {
        fileInput.click();
    }
}

function handleFileUpload(event) {
    if (navigationStack.length === 0) return;
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    const currentFolder = navigationStack[navigationStack.length - 1];
    if (!currentFolder.files) currentFolder.files = [];

    Array.from(uploadedFiles).forEach(file => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const dataBase64 = e.target.result;
            const ext = file.name.split('.').pop().toLowerCase();
            let type = 'unknown';
            let icon = 'fa-file';
            let color = 'text-gray-400';

            if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
                type = 'image';
                icon = 'fa-file-image';
                color = 'text-purple-400';
            } else if (ext === 'pdf') {
                type = 'pdf';
                icon = 'fa-file-pdf';
                color = 'text-red-400';
            } else if (['docx', 'doc'].includes(ext)) {
                type = 'docx';
                icon = 'fa-file-word';
                color = 'text-blue-400';
            } else if (['txt', 'js', 'cpp', 'html', 'css', 'py', 'json'].includes(ext)) {
                type = 'code';
                icon = 'fa-file-code';
                color = 'text-emerald-400';
            }

            const fileObj = {
                id: 'usr_' + Date.now() + Math.random().toString(36).substr(2, 4),
                name: file.name,
                size: formatBytes(file.size),
                type: type,
                icon: icon,
                color: color,
                dataUrl: dataBase64
            };

            currentFolder.files.unshift(fileObj);
            saveFoldersToStorage();
            renderFolderModal();
        };

        reader.readAsDataURL(file);
    });

    event.target.value = '';
}

function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function deleteCurrentFile(index) {
    const currentFolder = navigationStack[navigationStack.length - 1];
    currentFolder.files.splice(index, 1);
    saveFoldersToStorage();
    renderFolderModal();
}

function downloadCurrentFile(index) {
    const currentFolder = navigationStack[navigationStack.length - 1];
    const file = currentFolder.files[index];
    if (!file || !file.dataUrl) return;

    const a = document.createElement('a');
    a.href = file.dataUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// VISTA PREVIA
async function previewCurrentFile(index) {
    const currentFolder = navigationStack[navigationStack.length - 1];
    const file = currentFolder.files[index];
    if (!file) return;

    if (file.type === 'url' && file.dataUrl) {
        window.open(file.dataUrl, '_blank');
        return;
    }

    const modal = document.getElementById('preview-modal');
    const nameEl = document.getElementById('modal-file-name');
    const metaEl = document.getElementById('modal-file-meta');
    const iconContainer = document.getElementById('modal-file-icon');
    const downloadBtn = document.getElementById('modal-download-btn');
    const loading = document.getElementById('preview-loading');
    const imageControls = document.getElementById('image-controls');

    document.getElementById('view-image-wrapper').classList.add('hidden');
    document.getElementById('view-word-wrapper').classList.add('hidden');
    document.getElementById('view-pdf-frame').classList.add('hidden');
    document.getElementById('view-code-wrapper').classList.add('hidden');
    document.getElementById('view-fallback').classList.add('hidden');
    imageControls.classList.add('hidden');

    nameEl.textContent = file.name;
    metaEl.textContent = `${file.type.toUpperCase()} • ${file.size}`;
    iconContainer.innerHTML = `<i class="fa-solid ${file.icon}"></i>`;
    iconContainer.className = `w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 ${file.color}`;

    downloadBtn.onclick = () => downloadCurrentFile(index);

    modal.classList.remove('hidden');
    loading.classList.remove('hidden');

    try {
        if (file.type === 'image') {
            const imgEl = document.getElementById('view-image');
            imgEl.src = file.dataUrl;
            resetImageTransform();
            document.getElementById('view-image-wrapper').classList.remove('hidden');
            imageControls.classList.remove('hidden');
        } else if (file.type === 'docx') {
            const wordWrapper = document.getElementById('view-word-wrapper');
            if (file.content) {
                wordWrapper.innerHTML = file.content;
            } else if (file.dataUrl) {
                const base64Data = file.dataUrl.split(',')[1];
                const binaryString = window.atob(base64Data);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const result = await mammoth.convertToHtml({ arrayBuffer: bytes.buffer });
                wordWrapper.innerHTML = result.value || '<p class="text-gray-400">Documento vacío.</p>';
            }
            wordWrapper.classList.remove('hidden');
        } else if (file.type === 'pdf') {
            const pdfFrame = document.getElementById('view-pdf-frame');
            pdfFrame.src = file.dataUrl;
            pdfFrame.classList.remove('hidden');
        } else if (file.type === 'code') {
            const codeContent = document.getElementById('view-code-content');
            if (file.content) {
                codeContent.textContent = file.content;
            } else if (file.dataUrl) {
                const base64Data = file.dataUrl.split(',')[1];
                const decodedText = decodeURIComponent(escape(window.atob(base64Data)));
                codeContent.textContent = decodedText;
            }
            document.getElementById('view-code-wrapper').classList.remove('hidden');
        } else {
            document.getElementById('view-fallback').classList.remove('hidden');
        }
    } catch (err) {
        console.error(err);
        document.getElementById('view-fallback').classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

function closePreviewModal() {
    document.getElementById('preview-modal').classList.add('hidden');
    document.getElementById('view-pdf-frame').src = '';
}

function zoomImage(amount) {
    currentImageScale = Math.max(0.3, Math.min(3, currentImageScale + amount));
    document.getElementById('view-image').style.transform = `scale(${currentImageScale})`;
}

function resetImageTransform() {
    currentImageScale = 1;
    document.getElementById('view-image').style.transform = `scale(1)`;
}

// PERFIL
function openProfileModal() {
    document.getElementById('input-profile-name').value = document.getElementById('user-name').textContent.trim();
    document.getElementById('input-profile-title').value = document.getElementById('user-title').textContent.trim();
    document.getElementById('input-profile-bio').value = document.getElementById('user-bio').textContent.trim();
    document.getElementById('input-profile-avatar').value = document.getElementById('user-avatar').src;
    document.getElementById('profile-modal').classList.remove('hidden');
}

function closeProfileModal() {
    document.getElementById('profile-modal').classList.add('hidden');
}

function saveProfileChanges() {
    const newName = document.getElementById('input-profile-name').value;
    const newTitle = document.getElementById('input-profile-title').value;
    const newBio = document.getElementById('input-profile-bio').value;
    const newAvatar = document.getElementById('input-profile-avatar').value;

    if (newName) document.getElementById('user-name').textContent = newName;
    if (newTitle) document.getElementById('user-title').textContent = newTitle;
    if (newBio) document.getElementById('user-bio').textContent = newBio;
    if (newAvatar) document.getElementById('user-avatar').src = newAvatar;

    const profileData = { name: newName, title: newTitle, bio: newBio, avatar: newAvatar };
    localStorage.setItem('stiff_portfolio_profile', JSON.stringify(profileData));
    closeProfileModal();
}

function handleContactSubmit(event) {
    event.preventDefault();
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.');
    event.target.reset();
}