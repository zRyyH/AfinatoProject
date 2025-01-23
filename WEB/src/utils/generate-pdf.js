import jsPDF from 'jspdf';
import 'jspdf-autotable';
import image from '../midia/logoAuth.png';


const carregarImagemComoBase64 = (src, callback) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Necessário para evitar problemas com CORS

    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Converte o canvas para base64
        const base64 = canvas.toDataURL('image/png');

        callback(base64);
    };

    img.src = src;
};

export function generatePdf(linhas) {
    try {
        // Exemplo de uso
        carregarImagemComoBase64(image, (base64) => {
            // Cria uma instância do jsPDF
            const doc = new jsPDF();

            doc.addImage(base64, 'PNG', 85, 7, 40, 19);

            // Define as colunas e as linhas da tabela
            const colunas = ['Hora', 'Cliente', 'Profissional', 'Sala', 'Status'];

            // Adiciona a tabela ao PDF
            doc.autoTable({
                head: [colunas],
                body: linhas,
                startY: 35, // Margem superior
                styles: { halign: 'center' }, // Alinhamento horizontal
                headStyles: { fillColor: [41, 128, 185] }, // Cor do cabeçalho
            });

            const dataAtual = new Date();

            const dia = dataAtual.getDate(); // Dia do mês (1-31)
            const mes = dataAtual.getMonth() + 1; // Mês (0-11, por isso somamos 1)
            const ano = dataAtual.getFullYear();
            const hora = String(dataAtual.getHours()).padStart(2, '0'); // Hora com 2 dígitos
            const minutos = String(dataAtual.getMinutes()).padStart(2, '0'); // Minutos com 2 dígitos

            const dataFormatada = `${dia}/${mes}/${ano} às ${hora}:${minutos}`;

            // Adiciona a data no rodapé, no centro da página
            doc.setFontSize(10);
            doc.text(`Gerado em: ${dataFormatada}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });


            // Salva o PDF
            doc.save(`consultas-${dia}/${mes}/${ano}.pdf`);
        });

        return true;
    } catch {
        return false;
    }
};