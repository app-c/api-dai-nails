import { container } from "tsyringe";

import BCryptHasProvider from "./HashProvider/implementations/BCryptiHasProvider";
import IHashProvider from "./HashProvider/models/IHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHasProvider);
