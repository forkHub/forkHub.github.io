"use strict";
function dialogDaftarFile(onConfirm, onCancel) {
    let selectedItem = null;
    let dialog;
    let list;
    function createDialogEl(list) {
        // Create dialog element
        const dialog = document.createElement('dialog');
        dialog.className = 'pd dialog file-name flex dir col';
        function tombol(label, handle) {
            const btn = document.createElement('button');
            btn.textContent = label;
            btn.onclick = () => {
                handle();
            };
            return btn;
        }
        function buatTombolCont() {
            // Create buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'pd';
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'dialog-confirm';
            confirmBtn.textContent = 'Confirm';
            confirmBtn.onclick = () => {
                confirmKlik();
            };
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'dialog-cancel';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.onclick = () => {
                cancelKlik();
            };
            //todo tombol delete
            const hapus = tombol("hapus", () => {
                hapusKlik();
            });
            buttonContainer.appendChild(confirmBtn);
            buttonContainer.appendChild(hapus);
            buttonContainer.appendChild(cancelBtn);
            // Assemble dialog
            return buttonContainer;
        }
        dialog.appendChild(list);
        dialog.appendChild(buatTombolCont());
        return dialog;
    }
    function buatList() {
        list = document.createElement('ul');
        list.className = 'dialog-list disp-block flex-item grow-1';
        return list;
    }
    function refresh() {
        list.innerHTML = '';
        fileList.forEach(item => {
            const li = document.createElement('li');
            li.className = 'dialog-item pd';
            li.textContent = item.namaFile || "---";
            li.addEventListener('click', () => {
                list.querySelectorAll('.dialog-item').forEach(el => {
                    el.classList.remove('selected');
                });
                li.classList.add('selected');
                selectedItem = item;
            });
            list.appendChild(li);
        });
    }
    function hapusKlik() {
        if (!selectedItem) {
            alert('tidak ada file yang dipilih');
            return;
        }
        let konfirm = confirm("Apakah Anda yakin");
        if (konfirm) {
            for (let i = fileList.length - 1; i >= 0; i--) {
                if (fileList[i].namaFile == selectedItem.namaFile) {
                    console.log("hapus " + i);
                    console.log(fileList[i].namaFile);
                    console.log(selectedItem.namaFile);
                    console.log(fileList);
                    fileList.splice(i, 1);
                    console.log(fileList);
                    refresh();
                }
            }
        }
        //simpan
        window.localStorage.setItem(storageNama, JSON.stringify(fileList));
    }
    function confirmKlik() {
        onConfirm(selectedItem);
        closeAndDestroy();
    }
    function cancelKlik() {
        onCancel(selectedItem);
        closeAndDestroy();
    }
    // Cleanup
    function closeAndDestroy() {
        dialog.close();
        dialog.remove();
    }
    list = buatList();
    dialog = createDialogEl(list);
    dialog.addEventListener('close', () => {
        dialog.remove();
    });
    refresh();
    document.body.appendChild(dialog);
    dialog.showModal();
}
