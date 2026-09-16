import React, { useState, useMemo, useRef } from 'react';
import { motion, easeOut } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Filter, Grid3X3, List, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useProducts } from '@/contexts/ProductContext';
import { PRODUCT_CATEGORIES, ProductCategory } from '@/types/product';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductCategoryPath } from '@/lib/productCategoryRoute';
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,   // ✅ not "easeOut"
    },
  },
};

export default function Catalog() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: ProductCategory }>();
  const { products, getProductsByCategory, searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(category || 'all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerTitle, setViewerTitle] = useState<string>('');
  const [viewerProducts, setViewerProducts] = useState<typeof products>([]);
  const openCategoryViewer = (title: string, items: typeof products) => {
    setViewerTitle(title);
    setViewerProducts(items);
    setViewerOpen(true);
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const openPreview = (index: number) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
  };

  const nextPreview = () => {
    setPreviewIndex((i) => (i + 1) % viewerProducts.length);
  };
  const prevPreview = () => {
    setPreviewIndex((i) => (i - 1 + viewerProducts.length) % viewerProducts.length);
  };

  const active = viewerProducts[previewIndex];



  const catalogRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory);
    }

    if (searchQuery.trim()) {
      result = searchProducts(searchQuery).filter(product =>
        selectedCategory === 'all' || product.category === selectedCategory
      );
    }

    return result;
  }, [products, selectedCategory, searchQuery, getProductsByCategory, searchProducts]);

  const groupedByCategory = useMemo(() => {
    const map = new Map<string, typeof products>();
    filteredProducts.forEach((product) => {
      if (!map.has(product.category)) {
        map.set(product.category, []);
      }
      map.get(product.category)?.push(product);
    });
    return Array.from(map.entries());
  }, [filteredProducts]);

  const handleDownload = async () => {
    if (!catalogRef.current) return;

    const node = catalogRef.current;
    const images = Array.from(node.querySelectorAll('img'));

    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      })
    );

    const canvas = await html2canvas(node, { useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('catalog.pdf');
  };

  // Function to navigate to the Product Detail page and pass the ID in the state
  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // Try common field names for a product's PDF URL.
  // Adjust to your real field (catalogPdf / brochureUrl / pdfUrl / documentUrl, etc.)
  // If you have a static brochure file in /public/brochures/LENKA.pdf:
  const getPdfUrl = (p: any) =>
    p?.catalogPdf || p?.brochureUrl || p?.pdfUrl || p?.documentUrl || "/brochures/LENKA.pdf";


  // Opens a PDF in a new tab (preview). Falls back gracefully if blocked.
  const openPdfPreview = (e: React.MouseEvent, url?: string | null) => {
    e.stopPropagation();            // don't trigger the card's onClick (navigate)
    if (!url) {
      alert("No PDF available for this item yet.");
      return;
    }
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) {
      // popup blocked → navigate current tab as a fallback
      window.location.href = url;
    }
  };

const openCategoryPdfPreview = async (
  categoryName: string,
  categoryProducts: typeof products
) => {
  if (!categoryProducts || categoryProducts.length === 0) {
    alert("No products available in this category.");
    return;
  }

  // ==========================================
  // OPEN PREVIEW WINDOW
  // ==========================================

  const previewWindow = window.open("", "_blank");

  if (!previewWindow) {
    alert("Please allow popups to preview the catalog.");
    return;
  }

  previewWindow.document.write(`
    <html>
      <head>
        <title>Generating Catalog...</title>
      </head>

      <body
        style="
          margin: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
        "
      >
        <div style="text-align:center;">
          <h2>Generating Catalog Preview...</h2>
          <p>Please wait...</p>
        </div>
      </body>
    </html>
  `);

  previewWindow.document.close();

  // ==========================================
  // CREATE PDF
  // ==========================================

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  const margin = 15;

  const contentWidth =
    pageWidth - margin * 2;


  // ==========================================
  // FORMAT VALUE
  // ==========================================

  const formatValue = (
    value: any
  ): string => {

    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    if (typeof value === "string") {
      return value;
    }

    if (typeof value === "number") {
      return String(value);
    }

    if (typeof value === "boolean") {
      return String(value);
    }

    if (Array.isArray(value)) {

      return value
        .map((item) => {

          // If item is { key, value }
          if (
            typeof item === "object" &&
            item !== null &&
            "value" in item
          ) {
            return formatValue(
              item.value
            );
          }

          return formatValue(item);

        })
        .filter(Boolean)
        .join(", ");
    }

    if (typeof value === "object") {

      return Object.values(value)
        .map((item) =>
          formatValue(item)
        )
        .filter(Boolean)
        .join(", ");
    }

    return String(value);
  };


  // ==========================================
  // PARSE DATA
  // ==========================================

  const parseData = (
    data: any
  ): any => {

    if (!data) {
      return null;
    }

    if (typeof data === "string") {

      try {

        return JSON.parse(data);

      } catch {

        return data;

      }
    }

    return data;
  };


  // ==========================================
  // NORMALIZE DATA INTO KEY/VALUE ROWS
  //
  // Supports:
  //
  // [
  //   { key: "Product Type", value: "Table" }
  // ]
  //
  // OR
  //
  // {
  //   "Product Type": "Table"
  // }
  // ==========================================

  const normalizeEntries = (
    data: any
  ): Array<{
    key: string;
    value: any;
  }> => {

    const parsed =
      parseData(data);

    if (!parsed) {
      return [];
    }


    // ========================================
    // ARRAY FORMAT
    // [
    //   {
    //     key: "Product Type",
    //     value: "Executive Conference Table"
    //   }
    // ]
    // ========================================

    if (Array.isArray(parsed)) {

      return parsed
        .map((item) => {

          if (
            typeof item === "object" &&
            item !== null
          ) {

            // { key: "...", value: "..." }

            if (
              "key" in item &&
              "value" in item
            ) {

              return {
                key: String(
                  item.key
                ),

                value:
                  item.value,
              };

            }


            // Alternative:
            // { name: "...", value: "..." }

            if (
              "name" in item &&
              "value" in item
            ) {

              return {
                key: String(
                  item.name
                ),

                value:
                  item.value,
              };

            }


            // Alternative:
            // { label: "...", value: "..." }

            if (
              "label" in item &&
              "value" in item
            ) {

              return {
                key: String(
                  item.label
                ),

                value:
                  item.value,
              };

            }


            // Normal object inside array

            const entries =
              Object.entries(item);

            if (
              entries.length === 1
            ) {

              return {
                key:
                  String(
                    entries[0][0]
                  ),

                value:
                  entries[0][1],
              };

            }

          }

          return null;

        })
        .filter(
          (
            item
          ): item is {
            key: string;
            value: any;
          } => item !== null
        );
    }


    // ========================================
    // OBJECT FORMAT
    //
    // {
    //   "Product Type":
    //     "Executive Conference Table"
    // }
    // ========================================

    if (
      typeof parsed === "object" &&
      parsed !== null
    ) {

      // Special case:
      // { key: "...", value: "..." }

      if (
        "key" in parsed &&
        "value" in parsed
      ) {

        return [
          {
            key:
              String(
                parsed.key
              ),

            value:
              parsed.value,
          },
        ];
      }


      return Object.entries(
        parsed
      )
        .filter(
          ([key, value]) =>
            Boolean(key) &&
            formatValue(value)
        )
        .map(
          ([key, value]) => ({
            key,
            value,
          })
        );
    }


    return [];
  };


  // ==========================================
  // LOAD IMAGE
  // ==========================================

  const loadImage = (
    imageUrl: string
  ): Promise<HTMLImageElement | null> => {

    return new Promise(
      (resolve) => {

        const image =
          new Image();

        image.crossOrigin =
          "anonymous";

        image.onload = () => {
          resolve(image);
        };

        image.onerror = () => {
          resolve(null);
        };

        image.src =
          imageUrl;

      }
    );

  };


  // ==========================================
  // DRAW INFORMATION CARD
  //
  // RESULT:
  //
  // Specifications
  //
  // Product Type     Executive Conference Table
  // -----------------------------------------
  //
  // Table Shape      Rectangular
  // -----------------------------------------
  // ==========================================

  const drawInfoCard = (
    title: string,
    data: any,
    startY: number
  ) => {

    // ========================================
    // GET PROPER KEY/VALUE ROWS
    // ========================================

    const entries =
      normalizeEntries(data);


    if (
      entries.length === 0
    ) {

      return startY;

    }


    // ========================================
    // CARD SETTINGS
    // ========================================

    const boxX =
      margin;

    const boxWidth =
      contentWidth;


    // KEY COLUMN

    const keyColumnWidth =
      65;


    // VALUE COLUMN

    const valueColumnWidth =
      boxWidth -
      keyColumnWidth -
      20;


    // ========================================
    // PREPARE ROWS
    // ========================================

    const rows =
      entries.map(
        (item) => {

          const keyText =
            item.key;

          const valueText =
            formatValue(
              item.value
            );


          const keyLines =
            pdf.splitTextToSize(
              keyText,
              keyColumnWidth - 8
            );


          const valueLines =
            pdf.splitTextToSize(
              valueText,
              valueColumnWidth
            );


          const maxLines =
            Math.max(
              keyLines.length,
              valueLines.length
            );


          const rowHeight =
            Math.max(
              14,
              maxLines * 5 + 8
            );


          return {

            keyLines,

            valueLines,

            rowHeight,

          };

        }
      );


    // ========================================
    // CARD HEIGHT
    // ========================================

    const titleHeight =
      18;


    const rowsHeight =
      rows.reduce(
        (total, row) =>
          total +
          row.rowHeight,
        0
      );


    const totalHeight =
      titleHeight +
      rowsHeight +
      8;


    // ========================================
    // CHECK PAGE SPACE
    // ========================================

    if (
      startY +
        totalHeight >
      pageHeight - 20
    ) {

      pdf.addPage();

      startY = 20;

    }


    const boxY =
      startY;


    // ========================================
    // CARD BACKGROUND
    // ========================================

    pdf.setFillColor(
      248,
      248,
      248
    );


    pdf.roundedRect(
      boxX,
      boxY,
      boxWidth,
      totalHeight,
      4,
      4,
      "F"
    );


    // ========================================
    // CARD BORDER
    // ========================================

    pdf.setDrawColor(
      210,
      210,
      210
    );


    pdf.setLineWidth(
      0.4
    );


    pdf.roundedRect(
      boxX,
      boxY,
      boxWidth,
      totalHeight,
      4,
      4,
      "S"
    );


    // ========================================
    // TITLE
    // ========================================

    let y =
      boxY + 12;


    pdf.setFont(
      "helvetica",
      "bold"
    );


    pdf.setFontSize(
      16
    );


    pdf.setTextColor(
      35,
      35,
      35
    );


    pdf.text(
      title,
      boxX + 8,
      y
    );


    y += 12;


    // ========================================
    // DISPLAY KEY / VALUE ROWS
    // ========================================

    rows.forEach(
      (
        row,
        index
      ) => {


        const keyX =
          boxX + 8;


        const valueX =
          boxX +
          keyColumnWidth +
          8;


        // ====================================
        // KEY
        //
        // Example:
        //
        // Product Type
        // ====================================

        pdf.setFont(
          "helvetica",
          "bold"
        );


        pdf.setFontSize(
          10
        );


        pdf.setTextColor(
          40,
          40,
          40
        );


        pdf.text(
          row.keyLines,
          keyX,
          y
        );


        // ====================================
        // VALUE
        //
        // Example:
        //
        // Modular Office Workstation
        // ====================================

        pdf.setFont(
          "helvetica",
          "normal"
        );


        pdf.setFontSize(
          10
        );


        pdf.setTextColor(
          90,
          90,
          90
        );


        pdf.text(
          row.valueLines,
          valueX,
          y
        );


        // ====================================
        // NEXT ROW
        // ====================================

        y +=
          row.rowHeight;


        // ====================================
        // DIVIDER LINE
        // ====================================

        if (
          index <
          rows.length - 1
        ) {

          pdf.setDrawColor(
            220,
            220,
            220
          );


          pdf.setLineWidth(
            0.25
          );


          pdf.line(
            boxX + 8,
            y - 5,
            boxX +
              boxWidth -
              8,
            y - 5
          );

        }

      }
    );


    return (
      boxY +
      totalHeight +
      8
    );

  };


  // ==========================================
  // LOOP PRODUCTS
  // ==========================================

  for (
    let productIndex = 0;
    productIndex <
    categoryProducts.length;
    productIndex++
  ) {


    const product =
      categoryProducts[
        productIndex
      ];


    // ========================================
    // ONE PRODUCT = ONE PAGE
    // ========================================

    if (
      productIndex > 0
    ) {

      pdf.addPage();

    }


    let y = 15;


    // ========================================
    // CATEGORY NAME
    // ========================================

    const categoryTitle =
      categoryName
        .replace(
          /-/g,
          " "
        )
        .toUpperCase();


    pdf.setFont(
      "helvetica",
      "normal"
    );


    pdf.setFontSize(
      9
    );


    pdf.setTextColor(
      100,
      100,
      100
    );


    pdf.text(
      categoryTitle,
      pageWidth / 2,
      y,
      {
        align: "center",
      }
    );


    y += 10;


    // ========================================
    // PRODUCT NAME
    // ========================================

    const productName =
      formatValue(
        product.name
      );


    pdf.setFont(
      "helvetica",
      "bold"
    );


    pdf.setFontSize(
      18
    );


    pdf.setTextColor(
      35,
      35,
      35
    );


    const productNameLines =
      pdf.splitTextToSize(
        productName,
        contentWidth
      );


    pdf.text(
      productNameLines,
      pageWidth / 2,
      y,
      {
        align: "center",
      }
    );


    y +=
      productNameLines.length *
        7 +
      7;


    // ========================================
    // PRODUCT IMAGE
    // ========================================

    let imageUrl:
      | string
      | null =
      null;


    if (
      Array.isArray(
        product.images
      ) &&
      product.images.length > 0
    ) {

      imageUrl =
        product.images[0];

    }


    if (imageUrl) {

      try {

        const image =
          await loadImage(
            imageUrl
          );


        if (
          image &&
          image.naturalWidth > 0 &&
          image.naturalHeight > 0
        ) {

          const canvas =
            document.createElement(
              "canvas"
            );


          const context =
            canvas.getContext(
              "2d"
            );


          if (context) {

            canvas.width =
              image.naturalWidth;


            canvas.height =
              image.naturalHeight;


            context.drawImage(
              image,
              0,
              0
            );


            const imageData =
              canvas.toDataURL(
                "image/jpeg",
                0.9
              );


            const maxImageWidth =
              contentWidth;


            const maxImageHeight =
              65;


            let imageWidth =
              maxImageWidth;


            let imageHeight =
              (
                image.naturalHeight /
                image.naturalWidth
              ) *
              imageWidth;


            if (
              imageHeight >
              maxImageHeight
            ) {

              imageHeight =
                maxImageHeight;


              imageWidth =
                (
                  image.naturalWidth /
                  image.naturalHeight
                ) *
                imageHeight;

            }


            const imageX =
              (
                pageWidth -
                imageWidth
              ) / 2;


            pdf.addImage(
              imageData,
              "JPEG",
              imageX,
              y,
              imageWidth,
              imageHeight
            );


            y +=
              imageHeight +
              8;

          }

        }

      } catch (error) {

        console.error(
          "Unable to load image:",
          error
        );

      }

    }


    // ========================================
    // DESCRIPTION
    // ========================================

    if (
      product.description
    ) {

      const descriptionText =
        formatValue(
          product.description
        );


      if (
        descriptionText
      ) {


        pdf.setFont(
          "helvetica",
          "bold"
        );


        pdf.setFontSize(
          14
        );


        pdf.setTextColor(
          35,
          35,
          35
        );


        pdf.text(
          "Description",
          margin,
          y
        );


        y += 7;


        pdf.setFont(
          "helvetica",
          "normal"
        );


        pdf.setFontSize(
          9
        );


        pdf.setTextColor(
          90,
          90,
          90
        );


        const descriptionLines =
          pdf.splitTextToSize(
            descriptionText,
            contentWidth
          );


        pdf.text(
          descriptionLines,
          margin,
          y
        );


        y +=
          descriptionLines.length *
            4.5 +
          8;

      }

    }


    // ========================================
    // CUSTOMIZATION
    // ========================================

    const customization =
      (product as any)
        .customization;


    const customizationEntries =
      normalizeEntries(
        customization
      );


    if (
      customizationEntries.length >
      0
    ) {

      y = drawInfoCard(
        "Customization",
        customization,
        y
      );

    }


    // ========================================
    // SPECIFICATIONS
    // ========================================

    const specifications =
      product.specifications;


    const specificationEntries =
      normalizeEntries(
        specifications
      );


    if (
      specificationEntries.length >
      0
    ) {

      y = drawInfoCard(
        "Specifications",
        specifications,
        y
      );

    }


    // ========================================
    // FOOTER
    // ========================================

    pdf.setFont(
      "helvetica",
      "normal"
    );


    pdf.setFontSize(
      8
    );


    pdf.setTextColor(
      130,
      130,
      130
    );


    pdf.text(
      `${productIndex + 1} of ${categoryProducts.length}`,
      pageWidth / 2,
      pageHeight - 8,
      {
        align: "center",
      }
    );

  }


  // ==========================================
  // CREATE PDF BLOB
  // ==========================================

  const pdfBlob =
    pdf.output("blob");


  const pdfUrl =
    URL.createObjectURL(
      pdfBlob
    );


  // ==========================================
  // OPEN PDF PREVIEW
  // ==========================================

  previewWindow.location.href =
    pdfUrl;


  // ==========================================
  // REMOVE BLOB URL
  // ==========================================

  setTimeout(() => {

    URL.revokeObjectURL(
      pdfUrl
    );

  }, 300000);

};
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1">
        {/* Category Viewer */}
        <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
          <DialogContent className="max-w-6xl w-[96vw] p-0 overflow-hidden">
            <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold">{viewerTitle}</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {viewerProducts.length} item{viewerProducts.length > 1 ? 's' : ''} in this category
                </p>
              </div>
              <button className="p-2 rounded hover:bg-muted" onClick={() => setViewerOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Grid of products in this category */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {viewerProducts.map((p, idx) => (
                  <Card
                    key={p.id}
                    className="overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer"
                    onClick={() => openPreview(idx)}   // 👈 open preview for clicked product
                  >
                    <div className="relative aspect-[4/3] overflow-hidden group">
                      <img
                        src={Array.isArray(p.images) && p.images.length ? p.images[0] : '/placeholder.jpg'}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-foreground line-clamp-1">{p.name}</h3>
                          <p className="text-xs text-muted-foreground capitalize">{p.category.replace('-', ' ')}</p>
                        </div>
                        {p.featured && (
                          <span className="text-[10px] font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPdfPreview(e, getPdfUrl(p));
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Brochure
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewerOpen(false);
                            handleViewProduct(p.id);
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Image Preview (Lightbox) */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-[1000px] w-[96vw] p-0 overflow-hidden">
            {active && (
              <div className="relative bg-black/90 text-white">
                {/* header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <div className="min-w-0">
                    <p className="text-sm opacity-70">{viewerTitle}</p>
                    <h3 className="text-lg font-semibold truncate">{active.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={() => { setPreviewOpen(false); handleViewProduct(active.id); }}>
                      View product
                    </Button>
                    <button className="p-2 rounded hover:bg-white/10" onClick={() => setPreviewOpen(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* main image area */}
                <div className="relative">
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20"
                    onClick={prevPreview}>
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <div className="aspect-[4/3] grid place-items-center">
                    <img
                      src={(Array.isArray(active.images) && active.images.length ? active.images[0] : '/placeholder.jpg')}
                      alt={active.name}
                      className="max-h-[70vh] object-contain"
                    />
                  </div>

                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20"
                    onClick={nextPreview}>
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* thumbnails row */}
                <div className="p-4 bg-black/80 overflow-x-auto">
                  <div className="flex gap-3">
                    {viewerProducts.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => setPreviewIndex(i)}
                        className={`shrink-0 border rounded-md overflow-hidden ${i === previewIndex ? 'border-white' : 'border-white/20'}`}
                        title={p.name}
                      >
                        <img
                          src={Array.isArray(p.images) && p.images.length ? p.images[0] : '/placeholder.jpg'}
                          alt={p.name}
                          className="h-16 w-24 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>


      {/* <section className="bg-white py-20 overflow-hidden">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={item}
        className="text-4xl md:text-5xl font-bold text-[#14294C] mb-4"
      >
        Product Catalog
      </motion.h1>

      <motion.div
        variants={item}
        className="w-10 h-[2px] bg-[#14294C] mx-auto mb-6"
      />

      <motion.p
        variants={item}
        className="text-lg text-gray-900 max-w-2xl mx-auto"
      >
        Discover our comprehensive collection of premium furniture designed
        to elevate your space.
      </motion.p>
    </motion.div>
  </div>
</section> */}

        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus:border-[#b53e1d] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="flex gap-4 items-center">
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value as ProductCategory | 'all')}
                >
                  <SelectTrigger className="w-48 focus:border-[#b53e1d] focus:ring-0 focus:ring-offset-0">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div> */}

                {/* <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button> */}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {selectedCategory !== 'all' && ` in ${PRODUCT_CATEGORIES.find(c => c.value === selectedCategory)?.label}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>
        </section>

        {/* PDF target area */}
        <section className="py-12" ref={catalogRef}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedByCategory.map(([categoryKey, categoryProducts]) => {
                    const firstProduct = categoryProducts[0];
                    return (
                      <div
                        key={firstProduct.id}
                        onClick={() => navigate(getProductCategoryPath(categoryKey), {
                          state: { selectedSubcategory: categoryKey },
                        })}
                        className="cursor-pointer"
                      >

                        <Card className="overflow-hidden hover:shadow-card transition-all duration-300">
                          <div className="relative aspect-[4/3] overflow-hidden group">
                            <img
                              src={
                                Array.isArray(firstProduct.images) && firstProduct.images.length > 0
                                  ? firstProduct.images[0]
                                  : '/placeholder.jpg'
                              }
                              alt={firstProduct.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* optional hover overlay for contrast */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Download button ON the image */}
                            {/* Download button ON the image (actually opens preview) */}
                          <button
  onClick={(e) => {
    e.stopPropagation();

    openCategoryPdfPreview(
      categoryKey,
      categoryProducts
    );
  }}
  aria-label="Open catalog PDF"
  className="
    absolute left-3 bottom-3
    inline-flex items-center gap-2
    px-3 py-2
    rounded-md
    text-white text-sm font-semibold
    bg-gradient-to-b
    from-[#6b1d1d]
    to-[#1c0b0b]
    shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_8px_16px_rgba(0,0,0,.35)]
    hover:from-[#7f2323]
    hover:to-[#0f0707]
    active:translate-y-px
    backdrop-blur-sm
    transition-all
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
    />
  </svg>

  Download
</button>


                          </div>

                          <CardContent className="p-4 text-center">
                            <h3 className="font-semibold text-foreground mb-2 capitalize">
                              {categoryKey.replace('-', ' ')}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {categoryProducts.length} product{categoryProducts.length > 1 ? 's' : ''} available
                            </p>
                          </CardContent>
                        </Card>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} onClick={() => handleViewProduct(product.id)}>
                      <Card className="overflow-hidden hover:shadow-card transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-64 aspect-[4/3] md:aspect-auto overflow-hidden">
                            <img
                              src={product.images?.[0] || '/placeholder.jpg'}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardContent className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex gap-2">
                                <span className="text-xs font-medium text-primary capitalize bg-primary/10 px-2 py-1 rounded">
                                  {product.category.replace('-', ' ')}
                                </span>
                                {product.featured && (
                                  <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4 line-clamp-3">{product.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                              {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                                <div key={key}>
                                  <span className="font-medium text-foreground">{key}:</span>
                                  <span className="text-muted-foreground ml-1">{value}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
