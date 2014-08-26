/*
Copyright (c) Microsoft Open Technologies, Inc.
All Rights Reserved
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the
License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED,
INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache 2 License for the specific language governing permissions and limitations under the License.
*/

package com.msopentech.thali.local.utilities;

import com.couchbase.lite.Context;
import com.msopentech.thali.CouchDBListener.ThaliListener;
import com.msopentech.thali.CouchDBListener.java.JavaThaliListenerContext;
import com.msopentech.thali.java.toronionproxy.JavaOnionProxyContext;
import com.msopentech.thali.java.toronionproxy.JavaOnionProxyManager;
import com.msopentech.thali.relay.RelayWebServer;
import com.msopentech.thali.utilities.java.JavaEktorpCreateClientBuilder;
import com.msopentech.thali.utilities.test.RelayWebServerTest;
import com.msopentech.thali.utilities.universal.CreateClientBuilder;
import junit.framework.TestCase;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.security.*;

public class UtilitiesTestCase extends TestCase {
    public CreateClientBuilder getCreateClientBuilder() {
        return new JavaEktorpCreateClientBuilder();
    }

    public Context getNewRandomCouchBaseContext() throws IOException {
        return new CreateContextInTemp();
    }

    public File getRelayWorkingDirectory() throws IOException {
        return Files.createTempDirectory("RelayTempDirectory").toFile();
    }

    public ThaliListener getStartedListener(String subFolderName) throws IOException, InterruptedException,
            UnrecoverableKeyException, NoSuchAlgorithmException, KeyStoreException {
        JavaThaliListenerContext thaliListenerContext = new CreateContextInTemp();
        File thaliListenerTorDirectory = new File(thaliListenerContext.getFilesDir(), subFolderName);
        JavaOnionProxyManager javaOnionProxyManager =
                new JavaOnionProxyManager(new JavaOnionProxyContext(thaliListenerTorDirectory));
        ThaliListener thaliListener = new ThaliListener();
        thaliListener.startServer(thaliListenerContext, 0, javaOnionProxyManager);
        thaliListener.waitTillHiddenServiceStarts();
        return thaliListener;
    }

    public void testNothing() {
        //Avoid no tests found assertion failed error.
    }
}
