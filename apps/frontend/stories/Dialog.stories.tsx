import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-londrina">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Schema</DialogTitle>
          <DialogDescription>
            This will create a new schema in your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm">
              Name
            </label>
            <input
              id="name"
              className="col-span-3 h-8 rounded-md border border-input bg-transparent px-3 text-sm"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right text-sm">
              Description
            </label>
            <input
              id="description"
              className="col-span-3 h-8 rounded-md border border-input bg-transparent px-3 text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button type="submit">Create Schema</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-londrina">
          Open Long Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="space-y-4 py-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus quos tempore dolor facere enim accusantium
              distinctio sunt nobis beatae adipisci eius minus, earum commodi
              assumenda? Rerum totam molestiae debitis unde!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus quos tempore dolor facere enim accusantium
              distinctio sunt nobis beatae adipisci eius minus, earum commodi
              assumenda? Rerum totam molestiae debitis unde!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus quos tempore dolor facere enim accusantium
              distinctio sunt nobis beatae adipisci eius minus, earum commodi
              assumenda? Rerum totam molestiae debitis unde!
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};
