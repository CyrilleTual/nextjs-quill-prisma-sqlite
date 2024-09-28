export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl h-full shadow-lg rounded-lg p-10 bg-white m-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Next.js : Implémentation d’un éditeur WYSIWYG avec stockage d’images en
        base de données.
      </h1>
      <p className="text-gray-700 mb-2">
        <strong>Objectif :</strong> Permettre à un utilisateur de saisir du
        texte formaté et de télécharger une image qui servira d&apos;illustration à
        ce texte.
      </p>
      <p className="text-gray-700 mb-4">
        Techniquement, nous souhaitons stocker l&apos;image directement dans la base
        de données, accompagnant ainsi le contenu du post.
      </p>
      <p className="text-gray-700 mb-2">Pour ce faire, nous allons :</p>
      <ol className="list-decimal list-inside text-gray-700 mb-4">
        <li className="mb-2">
          Mettre en place un éditeur WYSIWYG (What You See Is What You Get),
          permettant à l&apos;utilisateur de saisir et de formater du texte, et un
          input pour l&apos;image.
        </li>
        <li className="mb-2">
          Travailler l&apos;image afin de réduire sa résolution et son poids pour
          optimiser son stockage.
        </li>
        <li className="mb-2">
          Convertir l&apos;image en un format compatible pour le transfert entre le
          front-end et le back-end via un fichier JSON.
        </li>
        <li className="mb-2">
          Transformer l&apos;image en un type Buffer pour la stocker efficacement
          dans une base de données SQLite.
        </li>
      </ol>
      <p className="text-gray-700">
        Enfin, nous couvrirons également le processus inverse : récupérer et
        afficher les posts avec leur illustration.
      </p>
    </main>
  );
}
