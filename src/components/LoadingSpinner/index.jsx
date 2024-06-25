import "./styles.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <div>Завантаження данних з текстового файлу...</div>
    </div>
  );
}
