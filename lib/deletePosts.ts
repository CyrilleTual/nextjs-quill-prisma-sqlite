// lib/deletePost.ts

export const handleDelete = async () => {

    try {
        const response = await fetch('/api/posts', {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des posts");
        }

        const data = await response.json();
        console.log('Posts supprimés:', data);
        // refresh the page
        window.location.reload();
    } catch (error) {
        console.error('Erreur:', error);
        // Vous pouvez également afficher une notification ici pour indiquer l'échec
    }

};
