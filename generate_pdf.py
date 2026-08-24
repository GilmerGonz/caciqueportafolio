import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.setFillColor(colors.HexColor("#0A0A0A"))
            self.rect(0, 762, 612, 30, fill=True, stroke=False)
            self.setFillColor(colors.HexColor("#F5F5F5"))
            self.setFont("Helvetica-Bold", 8)
            self.drawString(36, 773, "CACIQUE SOFTWARE DEVELOPMENT")
            self.setFont("Helvetica", 8)
            self.drawRightString(576, 773, "CATÁLOGO DE SERVICIOS & TARIFAS 2026")

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#1A1A1A"))
        self.setLineWidth(1)
        self.line(36, 40, 576, 40)
        
        self.setFillColor(colors.HexColor("#555555"))
        self.setFont("Helvetica-Bold", 7)
        self.drawString(36, 26, "CACIQUE SOFTWARE DEVELOPMENT — AUTORIDAD INDÍGENA. TECNOLOGÍA DE PUNTA.")
        self.drawRightString(576, 26, f"PÁGINA {self._pageNumber} DE {page_count}")
        
        self.restoreState()

def create_cacique_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles adhering strictly to Brand Book
    brand_header = ParagraphStyle(
        'BrandHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=30,
        textColor=colors.HexColor("#0A0A0A"),
        spaceAfter=4
    )

    brand_sub = ParagraphStyle(
        'BrandSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=colors.HexColor("#555555"),
        spaceAfter=15
    )

    badge_style = ParagraphStyle(
        'BadgeStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#F5F5F5"),
        backColor=colors.HexColor("#0A0A0A"),
        borderPadding=(4, 8, 4, 8),
        spaceAfter=10
    )

    title_impact = ParagraphStyle(
        'TitleImpact',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=17,
        textColor=colors.HexColor("#0A0A0A"),
        spaceAfter=6
    )

    copy_body = ParagraphStyle(
        'CopyBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#444444"),
        spaceAfter=8
    )

    features_style = ParagraphStyle(
        'FeaturesStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#0A0A0A")
    )

    price_tag = ParagraphStyle(
        'PriceTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=20,
        alignment=2, # Right
        textColor=colors.HexColor("#0A0A0A")
    )

    delivery_tag = ParagraphStyle(
        'DeliveryTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        alignment=2, # Right
        textColor=colors.HexColor("#555555")
    )

    elements = []

    # --- COVER BLOCK / HEADER ---
    elements.append(Paragraph("CACIQUE", brand_header))
    elements.append(Paragraph("SOFTWARE DEVELOPMENT — SERVICIOS & TARIFAS 2026", brand_sub))
    elements.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#0A0A0A"), spaceBefore=0, spaceAfter=15))

    manifesto_text = (
        "<b>PROMESA DE MARCA:</b> Construimos la infraestructura digital que permite a los negocios "
        "competir a nivel mundial — con la precisión del diseño suizo, entrega garantizada en 3 a 4 días "
        "y 100% garantía de devolución. Sin rellenos. Sin pretextos."
    )
    elements.append(Paragraph(manifesto_text, copy_body))
    elements.append(Spacer(1, 10))

    # LIST OF 10 SERVICES
    services_data = [
        {
            "num": "01",
            "name": "PÁGINAS WEB PROFESIONALES (SITIO CORPORATIVO)",
            "price": "$180 USD",
            "delivery": "ENTREGA: 3 DÍAS",
            "idea": "Tu negocio existe en el mundo físico, pero es invisible en el mundo digital.",
            "title": '"Un negocio sin página web es un negocio que no existe"',
            "copy": "El cliente moderno no pregunta por tu dirección física; busca tu nombre en internet. Si no encuentra un sitio web limpio, serio y veloz, asume que tu empresa no es confiable. Construimos la casa digital de tu negocio con arquitectura suiza, adaptable a celulares y optimizada para convertir prospectos en clientes desde el primer día.",
            "deliverables": "✓ Hasta 5 Secciones Corporativas  |  ✓ Diseño Adaptable Móvil/Desktop  |  ✓ Formularios & WhatsApp Directo"
        },
        {
            "num": "02",
            "name": "LANDING PAGE DE ALTA CONVERSIÓN",
            "price": "$100 USD",
            "delivery": "ENTREGA: 2 DÍAS",
            "idea": "Lanzamiento directo de ofertas, servicios específicos o campañas publicitarias.",
            "title": '"Una sola página. Ciento por ciento enfocada en vender."',
            "copy": "No necesitas un menú complejo si tu único objetivo es vender un producto o servicio específico. Una Landing Page elimina todas las distracciones, atrapa la atención de tu cliente ideal y lo conduce directo al botón de compra o contacto. Estructura de impacto inmediato diseñada para maximizar el retorno de tu publicidad.",
            "deliverables": "✓ Estructura de Venta Directa  |  ✓ Carga Ultra-rápida (Sub-segundo)  |  ✓ Enlace Directo a WhatsApp/CRM"
        },
        {
            "num": "03",
            "name": "POSICIONAMIENTO WEB & SEO (APARECER EN GOOGLE)",
            "price": "$150 USD",
            "delivery": "ENTREGA: 3 DÍAS",
            "idea": "Confrontar al negocio con su ausencia en búsquedas de clientes potenciales en Google.",
            "title": '"Google no sabe que existes"',
            "copy": "Tu negocio existe. Pero para Google, no. Mientras tu competencia aparece en la primera página de búsqueda, tú sigues esperando que el cliente te encuentre por casualidad. Eso no es mala suerte; es falta de estrategia digital. Optimizamos tu plataforma para que aparezcas primero cuando tus clientes busquen lo que tú vendes.",
            "deliverables": "✓ Alta en Google Search Console  |  ✓ Optimización SEO On-Page  |  ✓ Vinculación Google Business Map"
        },
        {
            "num": "04",
            "name": "E-COMMERCE / TIENDA ONLINE CON CARRITO",
            "price": "$250 USD",
            "delivery": "ENTREGA: 4 DÍAS",
            "idea": "Pérdida económica por mantener la tienda cerrada fuera del horario comercial.",
            "title": '"¿Cuánto dinero pierdes sin un carrito online?"',
            "copy": "Son las 11:00 PM. Un cliente quiere comprar tu producto. Tu local físico está cerrado. Esa venta se fue a la competencia y no regresa. Un e-commerce con carrito de compras online no duerme, no cierra y no dice \"vuelva mañana\". Vende en automático las 24 horas del día, los 365 días del año.",
            "deliverables": "✓ Catálogo Interactivo de Productos  |  ✓ Carrito de Compras Persistente  |  ✓ Cotización/Pago por WhatsApp & Pasarelas"
        },
        {
            "num": "05",
            "name": "PORTFOLIO FREELANCER / PROFESIONAL",
            "price": "$120 USD",
            "delivery": "ENTREGA: 3 DÍAS",
            "idea": "Reemplazar la venta informal por WhatsApp/PDF por una plataforma de autoridad.",
            "title": '"Tu trabajo no cabe en un PDF de WhatsApp"',
            "copy": "Enviar un PDF pesado o imágenes comprimidas por chat devalúa tu talento. La diferencia entre ser \"otro freelancer más\" y el \"experto cotizado\" es la presentación. Un portfolio web no se pierde, no se comprime y transmite autoridad instantánea antes de la primera llamada comercial.",
            "deliverables": "✓ Showcase Interactivo de Proyectos  |  ✓ Sección de Casos de Éxito  |  ✓ Enlace Directo a Agendamiento de Citas"
        },
        {
            "num": "06",
            "name": "MENÚ DIGITAL QR PARA RESTAURANTES & GASTRONOMÍA",
            "price": "$90 USD",
            "delivery": "ENTREGA: 2 DÍAS",
            "idea": "Reemplazar menús físicos desgastados por una experiencia interactiva sin fricción.",
            "title": '"Un código, todo tu menú actualizado al instante"',
            "copy": "El menú de papel se mancha, se rompe y queda desactualizado cada vez que cambias un precio. Con un menú digital QR, tu cliente escanea desde su mesa, ve los platos con fotos impecables y realiza su pedido sin esperar al mesero. Rápido para ti, cómodo para ellos.",
            "deliverables": "✓ Generación de Código QR para Mesas  |  ✓ Menú Dinámico por Categorías  |  ✓ Botón de Pedido Directo a WhatsApp/Cocina"
        },
        {
            "num": "07",
            "name": "SISTEMA DE CITAS Y AGENDAMIENTO ONLINE",
            "price": "$160 USD",
            "delivery": "ENTREGA: 3 DÍAS",
            "idea": "Eliminar la pérdida de tiempo contestando llamadas o chats para coordinar horas.",
            "title": '"Deja de contestar el teléfono por cada cita"',
            "copy": "Suena el teléfono. Otra vez. Tienes que interrumpir lo que estás haciendo para anotar una reserva. ¿Cuántas horas pierdes a la semana en esto? Con un sistema automático de reservas, tus clientes eligen su horario, confirman solos y tú solo te enfocas en atender.",
            "deliverables": "✓ Calendario Interactivo en Tiempo Real  |  ✓ Confirmación Automática  |  ✓ Gestión de Horarios & Especialistas"
        },
        {
            "num": "08",
            "name": "CV DIGITAL INTERACTIVO & PERFIL DE IMPACTO",
            "price": "$80 USD",
            "delivery": "ENTREGA: 2 DÍAS",
            "idea": "Diferenciarse en selecciones laborales reemplazando el archivo adjunto tradicional.",
            "title": '"El PDF que nadie abre vs. el link que sí impresiona"',
            "copy": "Envías tu currículum por correo y termina sepultado entre decenas de archivos adjuntos idénticos. Un CV Digital es un enlace web propio que se abre al instante en cualquier teléfono, demuestra tus capacidades de forma moderna y garantiza que tu perfil destaque de inmediato.",
            "deliverables": "✓ Formato Web Ejecutivo Responsivo  |  ✓ Descarga de PDF Oficial  |  ✓ Métricas & Links Acreditados"
        },
        {
            "num": "09",
            "name": "AUTOMATIZACIÓN DE VENTAS WHATSAPP CRM",
            "price": "$220 USD",
            "delivery": "ENTREGA: 4 DÍAS",
            "idea": "Pérdida de clientes potenciales por retrasos en la atención por mensajería.",
            "title": '"El prospecto que espera 10 minutos le compra a otro"',
            "copy": "En el mercado actual, la velocidad de respuesta lo es todo. Si un cliente interesado te escribe por WhatsApp y tardas en responder, buscará otra opción en segundos. Automatizamos la recepción de datos, etiqueta de prospectos y flujo de seguimiento para que no se escape ni una sola venta.",
            "deliverables": "✓ Integración WhatsApp Business API / CRM  |  ✓ Calificación Automática de Prospectos  |  ✓ Respuestas Rápidas & Flujos"
        },
        {
            "num": "10",
            "name": "AGENTE / CHATBOT DE INTELIGENCIA ARTIFICIAL 24/7",
            "price": "$300 USD",
            "delivery": "ENTREGA: 4 DÍAS",
            "idea": "Atención al cliente e informe de servicios automatizado con IA sin descanso.",
            "title": '"Tu mejor vendedor atendiendo clientes mientras duermes"',
            "copy": "Entrenamos un agente de Inteligencia Artificial personalizado con la información, catálogo y preguntas frecuentes de tu negocio. La IA responde dudas complejas, califica al cliente y agendando reuniones de venta a cualquier hora de la noche sin descanso ni errores.",
            "deliverables": "✓ Agente IA GPT Entrenado con tus Datos  |  ✓ Integración Web / WhatsApp  |  ✓ Captura de Datos de Leads en Tiempo Real"
        }
    ]

    for item in services_data:
        # Construct table for each service
        header_left = Paragraph(f"<b>SERVICIOS {item['num']}</b> — {item['name']}", ParagraphStyle('SvcHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor("#0A0A0A")))
        price_p = Paragraph(item['price'], price_tag)
        deliv_p = Paragraph(item['delivery'], delivery_tag)

        # Header bar table
        hdr_table = Table(
            [[header_left, price_p]],
            colWidths=[400, 140]
        )
        hdr_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN', (1,0), (1,0), 'RIGHT'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))

        title_p = Paragraph(item['title'], title_impact)
        copy_p = Paragraph(item['copy'], copy_body)
        feats_p = Paragraph(item['deliverables'], features_style)

        card_content = [
            hdr_table,
            Paragraph(item['delivery'], ParagraphStyle('SubDeliv', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, textColor=colors.HexColor("#555555"), spaceAfter=6)),
            HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceBefore=2, spaceAfter=8),
            title_p,
            copy_p,
            Spacer(1, 4),
            feats_p
        ]

        card_table = Table(
            [[card_content]],
            colWidths=[540]
        )
        card_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), colors.HexColor("#FFFFFF")),
            ('BOX', (0,0), (0,0), 1.5, colors.HexColor("#0A0A0A")),
            ('TOPPADDING', (0,0), (0,0), 10),
            ('BOTTOMPADDING', (0,0), (0,0), 10),
            ('LEFTPADDING', (0,0), (0,0), 12),
            ('RIGHTPADDING', (0,0), (0,0), 12),
        ]))

        elements.append(KeepTogether([card_table, Spacer(1, 12)]))

    # FOOTER CALL TO ACTION BLOCK
    cta_title = Paragraph("¿LISTO PARA CONSTRUIR LA INFRAESTRUCTURA DE TU NEGOCIO?", ParagraphStyle('CtaTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=12, textColor=colors.HexColor("#F5F5F5"), alignment=1))
    cta_body = Paragraph("Contacta directamente con Cacique Software Development para iniciar tu proyecto hoy.", ParagraphStyle('CtaBody', parent=styles['Normal'], fontName='Helvetica', fontSize=9, textColor=colors.HexColor("#AAAAAA"), alignment=1, spaceBefore=4))
    cta_phone = Paragraph("WhatsApp Directo: +58 412 416 3681  |  Entrega Garantizada en 3 Días", ParagraphStyle('CtaPhone', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor("#FFFFFF"), alignment=1, spaceBefore=6))

    cta_table = Table(
        [[ [cta_title, cta_body, cta_phone] ]],
        colWidths=[540]
    )
    cta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#0A0A0A")),
        ('TOPPADDING', (0,0), (0,0), 12),
        ('BOTTOMPADDING', (0,0), (0,0), 12),
        ('LEFTPADDING', (0,0), (0,0), 12),
        ('RIGHTPADDING', (0,0), (0,0), 12),
    ]))

    elements.append(KeepTogether([Spacer(1, 10), cta_table]))

    doc.build(elements, canvasmaker=NumberedCanvas)
    print(f"PDF exitosamente generado en: {filename}")

if __name__ == '__main__':
    target = r"C:\Users\Gilmer De Jesús\Desktop\Portfolio Cacique\Cacique_Catalogo_Servicios_2026.pdf"
    create_cacique_pdf(target)
