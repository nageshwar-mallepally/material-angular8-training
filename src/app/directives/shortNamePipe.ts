import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortName"
})
export class ShortNamePipe implements PipeTransform {
  transform(name: string): any {
    return name
      .split(" ")
      .map(n => n[0])
      .join("");
  }
}
