"use strict";
function dialogListFile(items, onConfirm, onCancel) {
    function createDialog(items, onConfirm, onCancel) {
        console.log(items);
        // Create dialog element
        const dialog = document.createElement('dialog');
        dialog.className = 'pd dialog file-name flex dir col';
        // Create item list
        const list = document.createElement('ul');
        list.className = 'dialog-list disp-block flex-item grow-1';
        let selectedItem = null;
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'dialog-item';
            li.textContent = item.name;
            li.addEventListener('click', () => {
                list.querySelectorAll('.dialog-item').forEach(el => {
                    el.classList.remove('selected');
                });
                li.classList.add('selected');
                selectedItem = item;
            });
            list.appendChild(li);
        });
        // Create buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'pd';
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'dialog-confirm';
        confirmBtn.textContent = 'Confirm';
        confirmBtn.onclick = () => {
            onConfirm(selectedItem);
            closeAndDestroy();
        };
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'dialog-cancel';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => {
            onCancel(selectedItem);
            closeAndDestroy();
        };
        buttonContainer.appendChild(confirmBtn);
        buttonContainer.appendChild(cancelBtn);
        // Assemble dialog
        dialog.appendChild(list);
        dialog.appendChild(buttonContainer);
        document.body.appendChild(dialog);
        // Show dialog
        dialog.showModal();
        // Cleanup
        function closeAndDestroy() {
            dialog.close();
            dialog.remove();
        }
        // Optional: auto-destroy on manual close
        dialog.addEventListener('close', () => {
            dialog.remove();
        });
    }
    createDialog(items, onConfirm, onCancel);
}
