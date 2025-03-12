import { Injectable } from '@angular/core';

export type Site = {
  name: string,
  path: string,
  children?: Site[];
}

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  constructor() { }

  private structureSites(sites: Site[]): Site[] {
    const root: Site[] = [];
    const pathMap = new Map<string, Site>();

    for(const site of sites) {
      const parts = site.path.split('/').filter(Boolean);
      const fullPath = parts.length ? `/${parts.join('/')}` : '/';

      const newNode: Site = { ...site, children: [] };
      pathMap.set(fullPath, newNode);

      if (parts.length === 0) {
        root.push(newNode);
        continue;
      }

      const parentPath = parts.length > 1 ? `/${parts.slice(0, -1).join('/')}` : '/';
      const parent = pathMap.get(parentPath);

      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(newNode);
      } else {
        root.push(newNode);
      }
    };

    return root;
  }
}
