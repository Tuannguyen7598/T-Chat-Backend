export class FileUploadDto {

    name: string;
    mimetype: string;
    size: number;

    constructor(name: string, mimetype: string, size: number) {
        this.name = name;
        this.mimetype = mimetype;
        this.size = size;
      }
}
