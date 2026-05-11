declare module "dom-to-image-more" {
  interface Options {
    /** Return false to exclude a node (and its children) from the output. Not called on the root node. */
    filter?: (node: Node) => boolean;
    /** Background color. Any valid CSS color value. */
    bgcolor?: string;
    /** Width in px applied to the node before rendering. */
    width?: number;
    /** Height in px applied to the node before rendering. */
    height?: number;
    /** CSS properties to apply to the node before rendering. */
    style?: Partial<CSSStyleDeclaration>;
    /** JPEG quality, 0–1. Defaults to 1.0. */
    quality?: number;
    /** Scale multiplier for higher-resolution output. Defaults to 1.0. */
    scale?: number;
    /** Data URL to use as placeholder for images that fail to load. */
    imagePlaceholder?: string;
    /** Append timestamp to URLs to bust cache. */
    cacheBust?: boolean;
    /** Called with the cloned root element after the DOM has been cloned. */
    onclone?: (clonedElement: Element) => void | Promise<void>;
    /** Disable embedding fonts into the SVG output. */
    disableEmbedFonts?: boolean;
    /** Disable inlining images into the SVG output. */
    disableInlineImages?: boolean;
  }

  function toPng(node: Node, options?: Options): Promise<string>;
  function toJpeg(node: Node, options?: Options): Promise<string>;
  function toBlob(node: Node, options?: Options): Promise<Blob | null>;
  function toCanvas(node: Node, options?: Options): Promise<HTMLCanvasElement>;
  function toSvg(node: Node, options?: Options): Promise<string>;

  interface DomToImage {
    toPng: typeof toPng;
    toJpeg: typeof toJpeg;
    toBlob: typeof toBlob;
    toCanvas: typeof toCanvas;
    toSvg: typeof toSvg;
  }

  const domtoimage: DomToImage;
  export = domtoimage;
}
