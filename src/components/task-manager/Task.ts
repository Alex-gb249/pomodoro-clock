import { v4 as uuidv4 } from 'uuid'

export class Task {
  private id: string
  private name: string
  private description: string
  private active: boolean

  constructor(name: string, description: string, active: boolean) {
    this.id = uuidv4()
    this.name = name
    this.description = description
    this.active = active
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getDescription(): string {
    return this.description
  }

  getActive(): boolean {
    return this.active
  }

  setName(name: string): void {
    this.name = name
  }

  setDescription(description: string): void {
    this.description = description
  }

  setActive(active: boolean): void {
    this.active = active
  }
}
