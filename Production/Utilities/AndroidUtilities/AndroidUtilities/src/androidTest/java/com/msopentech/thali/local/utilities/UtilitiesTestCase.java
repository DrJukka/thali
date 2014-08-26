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

import android.test.AndroidTestCase;
import com.couchbase.lite.Context;
import com.couchbase.lite.android.AndroidContext;
import com.msopentech.thali.CouchDBListener.ThaliListener;
import com.msopentech.thali.android.toronionproxy.AndroidOnionProxyManager;
import com.msopentech.thali.utilities.android.AndroidEktorpCreateClientBuilder;
import com.msopentech.thali.utilities.universal.CreateClientBuilder;
import org.apache.commons.lang3.RandomStringUtils;

import java.io.File;
import java.io.IOException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;

public class UtilitiesTestCase extends AndroidTestCase {
    public CreateClientBuilder getCreateClientBuilder() {
        return new AndroidEktorpCreateClientBuilder();
    }

    public Context getNewRandomCouchBaseContext() {
        return new AndroidContext(
                new AndroidContextChangeFilesDir(getContext(), RandomStringUtils.randomAlphanumeric(20)));
    }

    public ThaliListener getStartedListener(String subFolderName) throws UnrecoverableKeyException,
            NoSuchAlgorithmException, KeyStoreException, IOException, InterruptedException {
        AndroidContextChangeFilesDir androidContext =
                new AndroidContextChangeFilesDir(getContext(), subFolderName);
        AndroidOnionProxyManager androidOnionProxyManager =
                new AndroidOnionProxyManager(androidContext, subFolderName + "OnionProxyManager");
        ThaliListener thaliListener = new ThaliListener();
        thaliListener.startServer(
                new AndroidContext(new AndroidContextChangeFilesDir(androidContext, subFolderName)),
                0,
                androidOnionProxyManager);
        thaliListener.waitTillHiddenServiceStarts();
        return thaliListener;
    }
}
